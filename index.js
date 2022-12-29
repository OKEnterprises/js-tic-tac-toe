const gameBoard = (() => {
  let board = [
    ['X', 'O', 'X'],
    ['X', 'X', 'O'],
    ['O', 'X', 'X']
  ];

  const threeInRow = () => {
    return ((gameBoard.board[0][0] === gameBoard.board[0][1] && gameBoard.board[0][1] === gameBoard.board[0][2])
      || (gameBoard.board[0][0] === gameBoard.board[1][0] && gameBoard.board[1][0] === gameBoard.board[2][0])
      || (gameBoard.board[0][0] === gameBoard.board[1][1] && gameBoard.board[1][1] === gameBoard.board[2][2])
      || (gameBoard.board[2][0] === gameBoard.board[2][1] && gameBoard.board[2][1] === gameBoard.board[2][2])
      || (gameBoard.board[0][2] === gameBoard.board[1][2] && gameBoard.board[1][2] === gameBoard.board[2][2])
      || (gameBoard.board[2][0] === gameBoard.board[1][1] && gameBoard.board[1][1] === gameBoard.board[0][2]));
    }

  const boardFull = () => {
      for (let i = 0; i < gameBoard.board.length; i++) {
        for (let j = 0; j < gameBoard.board.length; j++) {
          if (gameBoard.board[i][j] === '') return false;
        }
      }
      return true;
  }

  const tie = () => {
    return boardFull() && !threeInRow();
  }

  const clear = () => {
    gameBoard.board = [
        ['','',''],
        ['','',''],
        ['','','']
    ];
  }

  const addMark = (row, col, character) => {
    if (gameBoard.board[row][col] === '') {
      gameBoard.board[row][col] = character;
    }
  }

  return { board, boardFull, threeInRow, tie, clear, addMark };

})();

const displayController = (() => {

  const gameInfo = document.querySelector('.game-info');

  const welcomeMsg = () => {
    gameInfo.textContent = 'Player 1 starts, playing Xs.';
  }
  
  const winMsg = (player) => {
    const { name, character } = player;
    gameInfo.textContent = `Congratulations! ${name} wins!`;
  }

  const displaySquares = document.querySelectorAll('.game-square');

  const renderBoard = () => {
    displaySquares.forEach(square => {
      let row = square.dataset.row;
      let col = square.dataset.col;

      square.textContent = gameBoard.board[row][col];
    });
  }

  return { displaySquares, renderBoard };

})();

const playerFactory = (name, character) => {
  return { name, character };
}

const game = (() => {
  let turn = 'X';

  const flipTurn = () => {
    if (turn === 'X') {
        turn = 'O';
    } else if (turn === 'O') {
        turn = 'X';
    }
  }

  const player1 = playerFactory(prompt('Player 1 Name'), 'X'); 

  const player2 = playerFactory(prompt('Player 2 Name'), 'O');

  const mountEventListeners = () => {
    displayController.displaySquares.forEach(square => {
      square.addEventListener('click', () => {
        gameBoard.addMark(square.dataset.row, square.dataset.col, turn);
        displayController.renderBoard();
        flipTurn();
      });
    });
  }

  const gameLoop = () => {
    gameBoard.clear();
    displayController.renderBoard();
    mountEventListeners();

    while (!gameBoard.boardFull() && !gameBoard.threeInRow()) {

    }

    if (gameBoard.threeInRow) {

    }
  };

    return { turn, gameLoop }

 })(); 

game.gameLoop();