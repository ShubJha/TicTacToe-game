// player factory function
const createPlayer = (name, marker) => {
    return { name, marker };
};

// gameboard object
const gameBoard = (() => {
    // generate board array
    let board = [];
    for (let i = 0; i < 9; i++) {
        board.push('');
    }

    // display square for each array item
    let squares = document.querySelector('.squares');

    board.forEach((item, index) => {
        const square = document.createElement('div');
        square.className = 'square';
        squares.appendChild(square);
    });

    // add event listeners on each square
    Array.from(squares.children).forEach((square, index) => {
        square.addEventListener('click', () => {
            if (game.winnerDeclared) {
                return; // If the game is already over, do nothing
            }
            // display active player marker
            square.classList.add(game.activePlayer.marker);
            square.setAttribute('data', game.activePlayer.marker);
            // update array value to be that of active player
            board[index] = game.activePlayer.marker;
            // remove event listener from the marked index
            square.style.pointerEvents = 'none';
            // update remainingSpots
            game.remainingSpots -= 1;
            // check winner: if all 3 values within any of these conditions are ===...
            game.checkWinner();
            // check remaining spots
            if (!game.winnerDeclared) {
                if (game.remainingSpots > 0) {
                    game.alertNextPlayer();
                    game.nextPlayer();
                } else if (game.remainingSpots === 0) {
                    game.declareTie();
                }
            }
        });
    });

    // return
    return {
        board,
    };
})();

// game object
const game = (() => {
    let restartButton = document.querySelector('#restart');

    // declare players
    const playerOne = createPlayer('Player 1', 'bolt');
    const playerTwo = createPlayer('Player 2', 'cross');

    // starting point
    let activePlayer = playerOne;
    let winnerDeclared = false;
    let remainingSpots = 9;

    // selectors
    let subtext = document.querySelector('.subtext'); // display winner/tie
    let playerName = document.querySelector('.player-name'); // purpose: alert player turn

    // winning conditions
    const winningAxes = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // check winner
    function checkWinner() {
        winningAxes.forEach((item, index) => {
            if (
                gameBoard.board[item[0]] === this.activePlayer.marker &&
                gameBoard.board[item[1]] === this.activePlayer.marker &&
                gameBoard.board[item[2]] === this.activePlayer.marker
            ) {
                console.log('winner!');
                subtext.innerHTML = `<b>${this.activePlayer.name} wins!</b>`;
                this.winnerDeclared = true;
                restartButton.hidden = false;
            }
        });
    }

    // alert next player
    function alertNextPlayer() {
        this.activePlayer === playerOne
            ? (playerName.textContent = 'Player 2')
            : (playerName.textContent = 'Player 1');
    }

    // next player
    function nextPlayer() {
        this.activePlayer === playerOne
            ? (this.activePlayer = playerTwo)
            : (this.activePlayer = playerOne);
        console.log('nextPlayer() function ran');
        console.log('active player: ' + activePlayer.name);
    }

    // declare tie
    function declareTie() {
        subtext.innerHTML = '<b>Tie game!</b>';
        restartButton.hidden = false;
    }

    // restart game
    function restartGame() {
        location.reload()
    }
  
  

    // Event listener for restart button
    restartButton.addEventListener('click', restartGame);

    // return
    return {
        activePlayer,
        remainingSpots,
        checkWinner,
        alertNextPlayer,
        nextPlayer,
        declareTie,
        winnerDeclared,
        restartGame,
    };
})();