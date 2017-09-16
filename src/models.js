const db = require('./db.js')

exports.scores = {
  get: function(req, res) {
    db.Score.find({})
      .limit(10)
      .sort({score: -1})
      .exec(function(err, data) {
        res.send(data)
      })
  },

  post: function(req, res) {
    db.Score.create({
      username: req.body.username || 'No User Given',
      score: req.body.score
    }, function(err, result) {
      if (err) {
        console.error(err)
        return
      }
      res.send(`Score Posted: ${result}`)
    })
  }
}
