const gameBoard = (() => {
  let board = [
    ['X', 'O', 'X'],
    ['X', 'X', 'O'],
    ['O', 'X', 'X']
  ];

  let turn = 'X';

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

  const addMark = (row, col) => {
    if (gameBoard.board[row][col] === '') {
      gameBoard.board[row][col] = character;
    }
  }

  return { board, boardFull, threeInRow, tie, clear, addMark };

})();

const displayController = (() => {
    const renderBoard = (gameBoard) => {
        const displaySquares = document.querySelectorAll(".game-square");

        displaySquares.forEach(square => {
            let row = square.dataset.row;
            let col = square.dataset.col;

            square.textContent = gameBoard.board[row][col];
            square.addEventListener('click', () => {
                gameBoard.addMark(row, col);
            });
        });
    }
    
})();

const game = (() => {
    const gameLoop = ((p1, p2) => {
        while (!gameBoard.boardFull() && !gameBoard.threeInRow()) {
            
        }
    });

    return { gameLoop, }

 })(); 

const playerFactory = (name, character) => {
    return { name, character };
}

const name1 = prompt("Name of Player 1");
const name2 = prompt("Name of Player 2");

const player1 = playerFactory(name1, 'X');
const player2 = playerFactory(name2, 'O');

const gameInfo = document.querySelector('#game-info');
gameInfo.textContent = "Player 1 starts, playing Xs.";

game.gameLoop(player1, player2);