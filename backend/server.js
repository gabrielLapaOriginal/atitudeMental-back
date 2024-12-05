const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const matriculasRouter = require('./api/matriculas');  

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://admin:admin@cluster0.fkldq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Conectado ao MongoDB!"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

app.use('/matriculas', matriculasRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
