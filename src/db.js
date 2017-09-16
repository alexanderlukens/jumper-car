const db = require('mongoose')
db.connect('mongodb://test:test@ds135514.mlab.com:35514/jumpercar', {useMongoClient:true});

let scoreSchema = new db.Schema({
  username: {
    type: String,
    default: 'No User Given'
  },
  score: {
    type: Number,
    required: true
  }
},{timestamps:true});


exports.Score = db.model('Score', scoreSchema);
