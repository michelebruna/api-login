const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestão de Login',
      version: '1.0.0',
      description: 'API para estudo de testes de software',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

// Rotas principais serão adicionadas aqui

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
  console.log('Swagger disponível em http://localhost:3000/api-docs');
}); 