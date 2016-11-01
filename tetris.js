var TETRIS_NUM_ROWS = 20;
var TETRIS_NUM_COLS = 10;
var TETRIS_BLOCK_WIDTH = 30;
var TETRIS_BLOCK_HEIGHT = 30;
var TETRIS_TICK_MS = 400;

function mkPiece(
    v11, v12, v13, v14,
    v21, v22, v23, v24,
    v31, v32, v33, v34,
    v41, v42, v43, v44) {
  return {
    'v11': v11, 'v12': v12, 'v13': v13, 'v14': v14,
    'v21': v21, 'v22': v22, 'v23': v23, 'v24': v24,
    'v31': v31, 'v32': v32, 'v33': v33, 'v34': v34,
    'v41': v41, 'v42': v42, 'v43': v43, 'v44': v44,
  }
}

var blockPiece = mkPiece(
  0, 0, 0, 0, 
  0, 1, 1, 0, 
  0, 1, 1, 0, 
  0, 0, 0, 0
);

var longPiece = mkPiece(
  0, 0, 1, 0,
  0, 0, 1, 0,
  0, 0, 1, 0,
  0, 0, 1, 0
);

var tPiece = mkPiece(
  0, 0, 1, 0,
  0, 1, 1, 0,
  0, 0, 1, 0,
  0, 0, 0, 0
);

var zlPiece = mkPiece(
  0, 0, 0, 0,
  0, 0, 1, 1,
  0, 1, 1, 0,
  0, 0, 0, 0
);

var zrPiece = mkPiece(
  0, 0, 0, 0,
  0, 1, 1, 0,
  0, 0, 1, 1,
  0, 0, 0, 0
);

var llPiece = mkPiece(
  0, 0, 1, 0,
  0, 0, 1, 0,
  0, 1, 1, 0,
  0, 0, 0, 0
);

var lrPiece = mkPiece(
  0, 1, 0, 0,
  0, 1, 0, 0,
  0, 1, 1, 0,
  0, 0, 0, 0
);

function rotateLeft(piece) {
  return mkPiece(
    piece.v14, piece.v24, piece.v34, piece.v44,
    piece.v13, piece.v23, piece.v33, piece.v43,
    piece.v12, piece.v22, piece.v32, piece.v42,
    piece.v11, piece.v21, piece.v31, piece.v41
  );
}

function rotateRight(piece) {
  return mkPiece(
    piece.v41, piece.v31, piece.v21, piece.v11,
    piece.v42, piece.v32, piece.v22, piece.v12,
    piece.v43, piece.v33, piece.v23, piece.v13,
    piece.v44, piece.v34, piece.v24, piece.v14
  );
}

function intersects(rows, piece, y, x) {
  if (x + 0 < 0 && (piece.v11 || piece.v21 || piece.v31 || piece.v41)) return true;
  if (x + 1 < 0 && (piece.v12 || piece.v22 || piece.v32 || piece.v42)) return true;
  if (x + 2 < 0 && (piece.v13 || piece.v23 || piece.v33 || piece.v43)) return true;
  if (x + 3 < 0 && (piece.v14 || piece.v24 || piece.v34 || piece.v44)) return true;
  if (x + 0 >= TETRIS_NUM_COLS && (piece.v11 || piece.v21 || piece.v31 || piece.v41)) return true;
  if (x + 1 >= TETRIS_NUM_COLS && (piece.v12 || piece.v22 || piece.v32 || piece.v42)) return true;
  if (x + 2 >= TETRIS_NUM_COLS && (piece.v13 || piece.v23 || piece.v33 || piece.v43)) return true;
  if (x + 3 >= TETRIS_NUM_COLS && (piece.v14 || piece.v24 || piece.v34 || piece.v44)) return true;
  if (y + 0 >= TETRIS_NUM_ROWS && (piece.v11 || piece.v12 || piece.v13 || piece.v14)) return true;
  if (y + 1 >= TETRIS_NUM_ROWS && (piece.v21 || piece.v22 || piece.v23 || piece.v24)) return true;
  if (y + 2 >= TETRIS_NUM_ROWS && (piece.v31 || piece.v32 || piece.v33 || piece.v34)) return true;
  if (y + 3 >= TETRIS_NUM_ROWS && (piece.v41 || piece.v42 || piece.v43 || piece.v44)) return true;
  if (piece.v11 && rows[0+y][0+x]) return true;
  if (piece.v12 && rows[0+y][1+x]) return true;
  if (piece.v13 && rows[0+y][2+x]) return true;
  if (piece.v14 && rows[0+y][3+x]) return true;
  if (piece.v21 && rows[1+y][0+x]) return true;
  if (piece.v22 && rows[1+y][1+x]) return true;
  if (piece.v23 && rows[1+y][2+x]) return true;
  if (piece.v24 && rows[1+y][3+x]) return true;
  if (piece.v31 && rows[2+y][0+x]) return true;
  if (piece.v32 && rows[2+y][1+x]) return true;
  if (piece.v33 && rows[2+y][2+x]) return true;
  if (piece.v34 && rows[2+y][3+x]) return true;
  if (piece.v41 && rows[3+y][0+x]) return true;
  if (piece.v42 && rows[3+y][1+x]) return true;
  if (piece.v43 && rows[3+y][2+x]) return true;
  if (piece.v44 && rows[3+y][3+x]) return true;
  return false;
}

function apply_piece(rows, piece, y, x) {
  if (piece.v11) rows[y+0][x+0] = 1;
  if (piece.v12) rows[y+0][x+1] = 1;
  if (piece.v13) rows[y+0][x+2] = 1;
  if (piece.v14) rows[y+0][x+3] = 1;
  if (piece.v21) rows[y+1][x+0] = 1;
  if (piece.v22) rows[y+1][x+1] = 1;
  if (piece.v23) rows[y+1][x+2] = 1;
  if (piece.v24) rows[y+1][x+3] = 1;
  if (piece.v31) rows[y+2][x+0] = 1;
  if (piece.v32) rows[y+2][x+1] = 1;
  if (piece.v33) rows[y+2][x+2] = 1;
  if (piece.v34) rows[y+2][x+3] = 1;
  if (piece.v41) rows[y+3][x+0] = 1;
  if (piece.v42) rows[y+3][x+1] = 1;
  if (piece.v43) rows[y+3][x+2] = 1;
  if (piece.v44) rows[y+3][x+3] = 1;
}

function kill_rows(rows) {
  var newRows = [];
  var k = TETRIS_NUM_ROWS;
  for (var i = TETRIS_NUM_ROWS; i --> 0;) {
    for (var j = 0; j < TETRIS_NUM_COLS; j++) {
      if (!rows[i][j]) {
        newRows[--k] = rows[i].slice();
        break;
      }
    }
  }
  var numRowsKilled = k;
  while (k-- > 0) {
    newRows[k] = [];
    for (var i = 0; i < TETRIS_NUM_COLS; i++) {
      newRows[k][i] = 0;
    }
  }
  return {
    'rows': newRows,
    'numRowsKilled': numRowsKilled
  };
}

function randomPiece() {
  var pieces = [ blockPiece, longPiece, tPiece, zlPiece, zrPiece, llPiece, lrPiece ];
  var i = Math.floor(Math.random() * pieces.length);
  return pieces[i];
}

function TetrisGame() {
  this.paused = false;
  this.gameOver = false;
  this.score = 0;
  this.currentPiece = randomPiece();
  this.nextPiece = randomPiece();
  this.pieceY = 0;
  this.pieceX = 3;
  this.rows = [];
  for (var i = 0; i < TETRIS_NUM_ROWS; i++) {
    this.rows[i] = []
    for (var j = 0; j < TETRIS_NUM_COLS; j++) {
      this.rows[i][j] = 0;
    }
  }
}

TetrisGame.prototype._freeze_piece = function() {
    this.score += 1;
    apply_piece(this.rows, this.currentPiece, this.pieceY, this.pieceX);
    var r = kill_rows(this.rows);
    this.rows = r.rows;
    this.score += r.numRowsKilled * r.numRowsKilled * TETRIS_NUM_COLS;
}

TetrisGame.prototype._fetch_next_piece = function() {
    if (intersects(this.rows, this.nextPiece, 0, TETRIS_NUM_COLS / 2 - 2)) {
      this.gameOver = true;
    } else {
      this.currentPiece = this.nextPiece;
      this.pieceY = 0;
      this.pieceX = TETRIS_NUM_COLS / 2 - 2;
      this.nextPiece = randomPiece();
    }
}

TetrisGame.prototype.tick = function() {
  if (this.paused || this.gameOver)
    return false;
  if (intersects(this.rows, this.currentPiece, this.pieceY + 1, this.pieceX)) {
    this._freeze_piece();
    this._fetch_next_piece();
  } else {
    this.pieceY += 1;
  }
  return true;
}

TetrisGame.prototype.togglePaused = function() {
  this.paused = !this.paused;
}

TetrisGame.prototype.steerLeft = function() {
  if (!intersects(this.rows, this.currentPiece, this.pieceY, this.pieceX - 1))
    this.pieceX -= 1;
}

TetrisGame.prototype.steerRight = function() {
  if (!intersects(this.rows, this.currentPiece, this.pieceY, this.pieceX + 1))
    this.pieceX += 1;
}

TetrisGame.prototype.steerDown = function() {
  if (!intersects(this.rows, this.currentPiece, this.pieceY + 1, this.pieceX))
    this.pieceY += 1;
}

TetrisGame.prototype.rotateLeft = function() {
  var newPiece = rotateLeft(this.currentPiece);
  if (!intersects(this.rows, newPiece, this.pieceY, this.pieceX))
    this.currentPiece = newPiece;
}

TetrisGame.prototype.rotateRight = function() {
  var newPiece = rotateRight(this.currentPiece);
  if (!intersects(this.rows, newPiece, this.pieceY, this.pieceX))
    this.currentPiece = newPiece;
}

TetrisGame.prototype.letFall = function() {
  while (!intersects(this.rows, this.currentPiece, this.pieceY+1, this.pieceX))
    this.pieceY += 1;
}

TetrisGame.prototype.get_rows = function() {
  var rows = [];
  for (var i = 0; i < TETRIS_NUM_ROWS; i++)
    rows[i] = this.rows[i].slice();
  apply_piece(rows, this.currentPiece, this.pieceY, this.pieceX);
  return rows;
}

TetrisGame.prototype.get_next_piece = function() {
  return this.nextPiece;
}

TetrisGame.prototype.get_score = function() {
  return this.score;
}

TetrisGame.prototype.get_game_over = function() {
  return this.gameOver;
}

function draw_blocks(rows, num_rows, num_cols) {
  var boardElem = document.createElement('div');
  for (var i = 0; i < num_rows; i++) {
    for (var j = 0; j < num_cols; j++) {
      var blockElem = document.createElement('div');
      blockElem.classList.add('tetrisBlock');
      if (rows[i][j])
        blockElem.classList.add('habitated');
      blockElem.style.top = (i * TETRIS_BLOCK_HEIGHT) + 'px';
      blockElem.style.left = (j * TETRIS_BLOCK_WIDTH) + 'px';
      boardElem.appendChild(blockElem);
    }
  }
  return boardElem;
}

function draw_tetrisGame(game) {
  var leftPaneElem = draw_tetrisLeftPane(game);
  var rightPaneElem = draw_tetrisRightPane(game);
  var gameElem = document.createElement('div');
  gameElem.classList.add('tetrisGame');
  gameElem.appendChild(leftPaneElem);
  gameElem.appendChild(rightPaneElem);
  return gameElem;
}

function draw_tetrisLeftPane(game) {
  var scoreElem = draw_tetrisScore(game);
  var previewElem = draw_tetrisPreview(game);
  var usageElem = draw_tetrisUsage(game);
  var leftPaneElem = document.createElement('div');
  leftPaneElem.classList.add('tetrisLeftPane');
  leftPaneElem.appendChild(previewElem);
  leftPaneElem.appendChild(scoreElem);
  leftPaneElem.appendChild(usageElem);
  return leftPaneElem;
}

function draw_tetrisRightPane(game) {
  var boardElem = draw_tetrisBoard(game);
  var rightPaneElem = document.createElement('div');
  rightPaneElem.classList.add('tetrisRightPane');
  rightPaneElem.appendChild(boardElem);
  return rightPaneElem;
}

function draw_tetrisBoard(game) {
  var rows = game.get_rows();
  var boardElem = draw_blocks(rows, TETRIS_NUM_ROWS, TETRIS_NUM_COLS);
  boardElem.classList.add('tetrisBoard');
  return boardElem;
}

function draw_tetrisScore(game) {
  var score = game.get_score();
  var scoreElem = document.createElement('div');
  scoreElem.classList.add('tetrisScore');
  scoreElem.innerHTML = '<p>SCORE: ' + score + '</p>';
  if (game.get_game_over())
    scoreElem.innerHTML += '<p>GAME OVER</p>'
  return scoreElem;
}

function draw_tetrisPreview(game) {
  var pieceRows = [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false]
  ]
  apply_piece(pieceRows, game.get_next_piece(), 0, 0);
  var pieceElem = draw_blocks(pieceRows, 4, 4);
  var previewElem = document.createElement('div');
  previewElem.classList.add('tetrisPreview');
  previewElem.appendChild(pieceElem);
  return previewElem;
}

function draw_tetrisUsage(game) {
  var usageElem = document.createElement('div');
  usageElem.classList.add('tetrisUsage');
  usageElem.innerHTML =
       "<table>" +
      "<tr><th>Cursor Keys</th><td>Steer</td></tr>" +
      "<tr><th>a/d</th><td>Rotate</td></tr>" +
      "<tr><th>Space bar</th><td>Let fall</td></tr>" +
      "<tr><th>Enter</th><td>Toggle pause</td></tr>" +
      "<tr><th>r</th><td>Restart game</td></tr>" +
      "</table>";
  return usageElem;
}

function tetris_redraw(game, containerElem) {
  var gameElem = draw_tetrisGame(game);
  containerElem.innerHTML = '';
  containerElem.appendChild(gameElem);
}

function tetris_run(containerElem) {
  var game = null;
  var handler = null;

  function setIntervalHandler() {
    handler = setInterval(
      function() {
        if (game.tick())
          tetris_redraw(game, containerElem);
      },
      TETRIS_TICK_MS
    );
  }

  function clearIntervalHandler() {
    clearInterval(handler);
    handler = null;
  }

  window.addEventListener('keydown', function(kev) {
      var consumed = true;
      if (kev.key === "ArrowLeft") {
        game.steerLeft();
        tetris_redraw(game, containerElem);
      } else if (kev.key === "ArrowRight") {
        game.steerRight();
        tetris_redraw(game, containerElem);
      } else if (kev.key === "ArrowDown") {
        game.steerDown();
        tetris_redraw(game, containerElem);
      } else if (kev.key === "a") {
        game.rotateLeft();
        tetris_redraw(game, containerElem);
      } else if (kev.key === "d") {
        game.rotateRight();
        tetris_redraw(game, containerElem);
      } else if (kev.key === " ") {
        game.letFall();
        clearIntervalHandler();
        setIntervalHandler();
        game.tick();
        tetris_redraw(game, containerElem);
      } else if (kev.key === "Enter") {
        game.togglePaused();
      } else if (kev.key === "r") {
        game = new TetrisGame();
      } else {
        consumed = false;
      }
      if (consumed)
        kev.preventDefault();
  });

  game = new TetrisGame();
  tetris_redraw(game, containerElem);
  setIntervalHandler();
}
