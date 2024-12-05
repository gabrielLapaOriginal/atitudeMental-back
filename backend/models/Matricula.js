const mongoose = require(`mongoose`)

const MatriculaSchema = new mongoose.mongoose.Schema({
  matricula: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(`Matricula`, MatriculaSchema)