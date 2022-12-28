const gameBoard = (() => {
    let board = [
        ['X', 'O', 'X'],
        ['X', 'X', 'O'],
        ['O', 'X', 'O']
    ];

    const threeInRow = () => {
        return ((this.board[0][0] === this.board[0][1] && this.board[0][1] === this.board[0][2])
                || (this.board[0][0] === this.board[1][0] && this.board[1][0] === this.board[2][0])
                || (this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2])
                || (this.board[2][0] === this.board[2][1] && this.board[2][1] === this.board[2][2])
                || (this.board[0][2] === this.board[1][2] && this.board[1][2] === this.board[2][2])
                || (this.board[2][0] === this.board[1][1] && this.board[1][1] === this.board[0][2]));
    }

    const clear = () => {
        this.board = [[],[],[]];
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