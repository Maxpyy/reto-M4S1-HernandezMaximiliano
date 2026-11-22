const express = require('express');
const app = express();

const PUERTO = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const nombre = process.env.NOMBRE_ALUMNO || 'Estudiante';
  res.send(`
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Calculadora de Promedio</title>
      </head>
      <body style="font-family: Arial; text-align: center; padding: 40px;">
        <h1>Calculadora de Promedio</h1>
        <p>Hecha por: ${nombre}</p>
        <form action="/promedio" method="GET">
          <input type="number" name="c1" placeholder="Calificación 1" step="0.1" min="0" max="10" required>
          <input type="number" name="c2" placeholder="Calificación 2" step="0.1" min="0" max="10" required>
          <input type="number" name="c3" placeholder="Calificación 3" step="0.1" min="0" max="10" required>
          <button type="submit">Calcular</button>
        </form>
      </body>
    </html>
  `);
});

app.get('/promedio', (req, res) => {
  const c1 = Number(req.query.c1);
  const c2 = Number(req.query.c2);
  const c3 = Number(req.query.c3);
  const promedio = ((c1 + c2 + c3) / 3).toFixed(1);
  const estado = promedio >= 6 ? 'Aprobado' : 'Reprobado';
  res.send(`
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resultado</title>
      </head>
      <body style="font-family: Arial; text-align: center; padding: 40px;">
        <h1>Tu promedio es: ${promedio}</h1>
        <h2>${estado}</h2>
        <a href="/">Volver</a>
      </body>
    </html>
  `);
});

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});