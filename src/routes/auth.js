const express = require('express');
const router = express.Router();

// Usuários em memória (exemplo)
const users = [
  {
    id: 1,
    username: 'grupo4',
    password: 'grupo4@1234',
    attempts: 0,
    blocked: false,
    resetToken: null,
  },
];

// Função auxiliar para encontrar usuário
function findUser(username) {
  return users.find(u => u.username === username);
}

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Usuário ou senha inválidos
 *       423:
 *         description: Usuário bloqueado
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = findUser(username);
  if (!user) return res.status(401).json({ message: 'Usuário ou senha inválidos' });
  if (user.blocked) return res.status(423).json({ message: 'Usuário bloqueado. Redefina a senha.' });
  if (user.password === password) {
    user.attempts = 0;
    return res.json({ message: 'Login realizado com sucesso' });
  } else {
    user.attempts++;
    if (user.attempts >= 3) {
      user.blocked = true;
      return res.status(423).json({ message: 'Usuário bloqueado após 3 tentativas.' });
    }
    return res.status(401).json({ message: 'Usuário ou senha inválidos' });
  }
});

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Solicita redefinição de senha
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token de redefinição enviado
 *       404:
 *         description: Usuário não encontrado
 */
router.post('/forgot-password', (req, res) => {
  const { username } = req.body;
  const user = findUser(username);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  // Gera token simples (apenas para estudo)
  user.resetToken = Math.random().toString(36).substring(2, 10);
  user.blocked = false;
  user.attempts = 0;
  return res.json({ message: 'Token de redefinição gerado', token: user.resetToken });
});

/**
 * @swagger
 * /reset-password:
 *   post:
 *     summary: Redefine a senha do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: Token inválido
 *       404:
 *         description: Usuário não encontrado
 */
router.post('/reset-password', (req, res) => {
  const { username, token, newPassword } = req.body;
  const user = findUser(username);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  if (user.resetToken !== token) return res.status(400).json({ message: 'Token inválido' });
  user.password = newPassword;
  user.resetToken = null;
  user.attempts = 0;
  user.blocked = false;
  return res.json({ message: 'Senha redefinida com sucesso' });
});

module.exports = router; 