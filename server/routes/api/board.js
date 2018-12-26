const Board = require('../../models/Board');
module.exports = (app) => {
  app.get('/api/board/get', (req, res) => {
    Board.findOne().exec(function(err, result) {
      res.json(result);
    });
  });

  app.post('/api/board', (req, res, next) => {
    const board = new Board();

    board.save()
      .then(() => res.json(board))
      .catch((err) => next(err));
  });

  app.post('/api/board/save', (req) => {
    Board.findOne().exec(function(err, result) {
      if (result === null || result === undefined) {
        Board.create({ categories: req.body.categories }, function(err) {
          if (err) return;
        });
      }
      else Board.updateOne({ _id: result._id },
        { categories: req.body.categories }).exec(
        function(err) {
          if (err) return;
        }
      );
    });
  });
}
