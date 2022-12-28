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

    const clear = () => {
        gameBoard.board = [[],[],[]];
    }

    return { board, threeInRow, clear };

})();

const displayController = (() => {
    const renderDisplay = () => {
        
    }
})();

const playerFactory = (name) => {
    return { name };
}