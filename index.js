const gameBoard = (() => {
  let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  const threeInRow = () => {
    const row0 = (board[0][0] !== '' && board[0][0] === board[0][1] && board[0][1] === board[0][2]);
    const row1 = (board[1][0] !== '' && board[1][0] === board[1][1] && board[1][1] === board[1][2]);
    const row2 = (board[2][0] !== '' && board[2][0] === board[2][1] && board[2][1] === board[2][2]);

    const col0 = (board[0][0] !== '' && board[0][0] === board[1][0] && board[1][0] === board[2][0]);
    const col1 = (board[0][1] !== '' && board[0][1] === board[1][1] && board[1][1] === board[2][1]);
    const col2 = (board[0][2] !== '' && board[0][2] === board[1][2] && board[1][2] === board[2][2]);

    const diagA = (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]);
    const diagB = (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]);

    return row0 || row1 || row2 || col0 || col1 || col2 || diagA || diagB;
  }

  const boardFull = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') return false;
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

  const tieMsg = () => {
    gameInfo.textContent = "It's a tie."
  }

  const turnMsg = (player) => {
    gameInfo.textContent = `It's ${player.name}'s turn, playing ${player.character}`
  }

  const displaySquares = document.querySelectorAll('.game-square');

  const renderBoard = () => {
    displaySquares.forEach(square => {
      let row = square.dataset.row;
      let col = square.dataset.col;

      square.textContent = gameBoard.board[row][col];
    });
  }

  return { gameInfo, welcomeMsg, winMsg, tieMsg, turnMsg, displaySquares, renderBoard };

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
    console.log(turn);
  }

  const player1 = playerFactory(prompt('Player 1 Name'), 'X'); 

  const player2 = playerFactory(prompt('Player 2 Name'), 'O');

  const gameOver = () => {
    if (gameBoard.tie()) {
       displayController.tieMsg();
    } else if (gameBoard.threeInRow() && turn === 'X') {
      displayController.winMsg(player2);
    } else if (gameBoard.threeInRow() && turn === 'O') {
      displayController.winMsg(player1);
    }
  }

  const resolveMove = (square) => {
    gameBoard.addMark(square.dataset.row, square.dataset.col, turn);
    displayController.renderBoard();

    if (gameBoard.boardFull()) {
        gameOver();
    } else {
        flipTurn();
        runTurn();
    }
  }
  
  const handleClick = () => {
    resolveMove(square);
  }

  const mountEventListeners = () => {
    displayController.displaySquares.forEach(square => {
      square.removeEventListener('click', handleClick);
      square.addEventListener('click', handleClick);
    });
  }

  const runTurn = () => {  
    displayController.renderBoard();

    if (turn === 'X') {
      displayController.turnMsg(player1);
    } else {
      displayController.turnMsg(player2);
    }

    mountEventListeners();

    if (gameBoard.threeInRow() && turn === 'X') {
      displayController.winMsg(player1);
    } else if (gameBoard.threeInRow() && turn === 'O') {
      displayController.winMsg(player2);
    } else if (gameBoard.tie()) {
      displayController.tieMsg();
    }
  }

  return { turn, flipTurn, player1, player2, gameOver, resolveMove, mountEventListeners, runTurn }

})(); 

game.runTurn();