const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://admin:admin@cluster0.fkldq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const MatriculaSchema = new mongoose.Schema({
  matricula: { type: String, required: true },
}, { timestamps: true });

const Matricula = mongoose.model("Matricula", MatriculaSchema);

module.exports = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Conectado");
    } catch (err) {
      console.error("Erro ao conectar ao MongoDB:", err);
      return res.status(500).json({ message: "Erro ao conectar ao banco de dados" });
    }
  }

  if (req.method === 'POST') {
    const { matricula } = req.body;
    try {
      const novaMatricula = new Matricula({ matricula });
      await novaMatricula.save();
      return res.status(201).json({ message: 'Matrícula salva com sucesso' });
    } catch (error) {
      return res.status(500).json({ message: `Erro ao salvar matrícula: ${error.message}` });
    }
  }  else if (req.method === 'GET') {
    try {
      const matriculas = await Matricula.find();
      return res.status(200).json(matriculas);
    } catch (error) {
      return res.status(500).json({ message: `Erro ao buscar matrículas: ${error.message}` });
    }
  } 
  
  else {
    return res.status(405).json({ message: 'Método não permitido' });
  }
};
