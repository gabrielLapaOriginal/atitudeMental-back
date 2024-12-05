const express = require(`express`)
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://admin:admin@cluster0.fkldq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {

}).then(() => {
  console.log("Conectado ao MongoDB!");
}).catch(err => console.error("Erro ao conectar ao MongoDB:", err));



const MatriculaSchema = new mongoose.Schema({
  matricula: { type: String, required: true },
}, { timestamps: true });

const Matricula = mongoose.model("Matricula", MatriculaSchema);

app.post(`/matriculas`, async (req, res) =>{
  const { matricula } = req.body;

  try{
    const novaMatricula = new Matricula({ matricula });
    await novaMatricula.save();
    res.status(201).json({message: `Matricula salva com sucesso`});
  } catch (error){
    res.status(500).json({message: `Erro ao salvar matricula ${error}`})
  }
});

app.listen(PORT, () =>{
  console.log(`Servidor rodando na porta ${PORT}`)
})