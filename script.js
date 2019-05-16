/*
    Name: Jeremy Becker
    Date: 04.10.19
    Filename: script.js
    Description: Scripts for the game
*/
var board = document.getElementById('game-board');
var squares = document.getElementsByClassName('square');
var allSquares = [...squares];
var player1 = "";
var player2 = "";
var currPlayer = "x";

// checks to see if someone has won the game
// each returns an object with victory as true, the winner as x or o, and which way won
function checkForWin() {
    let victory = false;
    // checks rows
    let topRow = document.querySelectorAll('.top td div');
    // checks top row
    if (topRow[0].className == topRow[1].className && 
        topRow[0].className == topRow[2].className &&
        topRow[0].className != 'square') {
        victory = true;
        return {
            victory,
            winner: topRow[0].className.substring(7),
            direction: 'top'
        }
    }
    let middleRow = document.querySelectorAll('.middle td div');
    // checks middle row
    if (middleRow[0].className == middleRow[1].className && 
        middleRow[0].className == middleRow[2].className &&
        middleRow[0].className != 'square') {
        victory = true;
        return {
            victory,
            winner: middleRow[0].className.substring(7),
            direction: 'middle'
        }
    }
    let bottomRow = document.querySelectorAll('.bottom td div');
    // checks bottom row
    if (bottomRow[0].className == bottomRow[1].className && 
        bottomRow[0].className == bottomRow[2].className &&
        bottomRow[0].className != 'square') {
        victory = true;
        return {
            victory,
            winner: bottomRow[0].className.substring(7),
            direction: 'bottom'
        }
    }
    // checks columns
    // checks left column
    if (topRow[0].className == middleRow[0].className && 
        topRow[0].className == bottomRow[0].className &&
        topRow[0].className != 'square') {
        victory = true;
        return {
            victory,
            winner: topRow[0].className.substring(7),
            direction: 'left'
        }
    }
    // checks center column
    if (topRow[1].className == middleRow[1].className && 
        topRow[1].className == bottomRow[1].className &&
        topRow[1].className != 'square') {
        victory = true;
        return {
            victory,
            winner: topRow[1].className.substring(7),
            direction: 'center'
        }
    }
    // checks right column
    if (topRow[2].className == middleRow[2].className && 
        topRow[2].className == bottomRow[2].className &&
        topRow[2].className != 'square') {
        victory = true;
        return {
            victory,
            winner: topRow[2].className.substring(7),
            direction: 'right'
        }
    }
    // checks diagonals
    // checks falling diagonal
    if (topRow[0].className == middleRow[1].className && 
        topRow[0].className == bottomRow[2].className &&
        topRow[0].className != 'square') {
        victory = true;
        return {
            victory,
            winner: topRow[0].className.substring(7),
            direction: 'falling'
        }
    }
    // checks rising diagonal
    if (bottomRow[0].className == middleRow[1].className && 
        bottomRow[0].className == topRow[2].className &&
        bottomRow[0].className != 'square') {
        victory = true;
        return {
            victory,
            winner: bottomRow[0].className.substring(7),
            direction: 'rising'
        }
    }
    if (squares.length == 0) {
        victory = true;
        return {
            victory,
            winner: 'none',
            direction: 'tie'
        }
    }
    return {
        victory
    }
}

// selects square in game
function playerSelection() {
    this.classList = 'square-' + currPlayer;
    this.textContent = currPlayer;
    let win = checkForWin();
    if (win.victory) {
        let squaresArray = [...squares];
        // disables empty squares
        for (let i = 0; i < squaresArray.length; i++) {
            squaresArray[i].removeEventListener('click', playerSelection);
            if (squaresArray[i].className == 'square') {
                squaresArray[i].classList = 'square-game-over';
            }
        }
        let winLine = document.getElementById('winLine');
        winLine.classList = 'game-over-line';
        let ctx = winLine.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        // displays text if it was a tie
        if (win.direction == 'tie') {
            ctx.font = '150px Arial';
            ctx.fillText('tie', winLine.width/2, winLine.height/2);
            document.getElementById('replayBtn').classList = 'show';
            // creates line through winning direction
        } else {
            ctx.lineWidth = 15;
            ctx.beginPath();
            switch (win.direction) {
                case 'top':
                    ctx.moveTo(0, 125);
                    ctx.lineTo(750, 125);
                    break;
                case 'middle':
                    ctx.moveTo(0, 375);
                    ctx.lineTo(750, 375);
                    break;
                case 'bottom':
                    ctx.moveTo(0, 625);
                    ctx.lineTo(750, 625);
                    break;
                case 'left':
                    ctx.moveTo(125, 0);
                    ctx.lineTo(125, 750);
                    break;
                case 'center':
                    ctx.moveTo(375, 0);
                    ctx.lineTo(375, 750);
                    break;
                case 'right':
                    ctx.moveTo(625, 0);
                    ctx.lineTo(625, 750);
                    break;
                case 'rising':
                    ctx.moveTo(0, 750);
                    ctx.lineTo(750, 0);
                    break;
                case 'falling':
                    ctx.moveTo(0, 0);
                    ctx.lineTo(750, 750);
                    break;
            }
            ctx.stroke();
            ctx.font = '75px Arial';
            // announcement of winner
            if (win.winner == 'x') {
                ctx.fillText(player1 + ' wins!', winLine.width/2, winLine.height/2);
            } else {
                ctx.fillText(player2 + ' wins!', winLine.width/2, winLine.height/2);
            }
            document.getElementById('replayBtn').classList = 'show';
        }
    } else {
        // removes event listener and switches current player
        this.removeEventListener('click', playerSelection);
        if (currPlayer == 'x') {
            currPlayer = 'o';
        } else {
            currPlayer = 'x';
        }
    }
}

// click event to start game
document.getElementById('startBtn').addEventListener('click', function() {
    let player1Input = document.getElementById('player1Inp').value;
    let player2Input = document.getElementById('player2Inp').value;
    if (player1Input == "") {
        player1 = "Player 1";
    } else {
        player1 = player1Input;
    }
    if (player2Input == "") {
        player2 = "Player 2";
    } else {
        player2 = player2Input;
    }
    document.getElementById('playerNames').classList = 'hide';
    document.getElementsByTagName('h1')[0].classList = 'hide';
    board.classList = "";
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', playerSelection);
    }
});

// click event to reset the game to play again
document.getElementById('replayBtn').addEventListener('click', function() {
    let winLine = document.getElementById('winLine');
    let ctx = winLine.getContext('2d');
    ctx.clearRect(0, 0, 750, 750);
    winLine.classList = '';
    document.getElementById('replayBtn').classList = '';
    currPlayer = 'x';
    for (let i = 0; i < allSquares.length; i++) {
        allSquares[i].classList = 'square';
        squares[i].addEventListener('click', playerSelection);
    }
});