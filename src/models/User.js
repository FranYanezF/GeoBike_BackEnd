const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: 'string',
  name: 'string',
  email: {
    type: 'string',
    unique: true
  },
  idAdmin: 'boolean',
  password: 'string'
});

module.exports = mongoose.model('User', schema);