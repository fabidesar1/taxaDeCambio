const express = require('express')
const app = express()

const PORT = 3230  


app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

app.listen(PORT, () => {
    console.log(`Servidor rodando no http://localhost:${PORT}`);
})