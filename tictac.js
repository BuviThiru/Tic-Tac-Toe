window.addEventListener('DOMContentLoaded', () => {
    //dom targets
    const tiles = document.querySelectorAll(".tiles");
    const playerTurn = document.querySelector(".player-turn")
    const announceResult = document.querySelector(".announceRes");
    const reset = document.querySelector(".btn");
    const background = document.querySelector("body")


    let currentPlayer = "X"
    let gameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON'
    const PLAYERO_WON = 'PLAYERO_WON'
    const TIE = 'TIE';

    let board = ["", "", "", "", "", "", "", "", ""]
    let wining = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

    //Event Listeners
    tiles.forEach(function (element, index) {
        element.addEventListener("click", () => userAction(element, index))
    })
    reset.addEventListener('click', resetBoard)

    //function

    function userAction(element, index) {
        if(isEmpty(element)&& gameActive){
        element.innerText = currentPlayer;
        element.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        resultValidation();
        changePlayer()
        }
        
    }
function isEmpty(element){
    if(element.innerHTML=="X" ||element.innerHTML=="O"){
        return false;
    }
    else return true
}
    function changePlayer() {
        playerTurn.classList.remove(`player${currentPlayer}`)
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        // console.log(changePlayer)

        playerTurn.innerText = currentPlayer;
        playerTurn.classList.add(`player${currentPlayer}`)

    }

    function resetBoard() {
        background.style .backgroundColor = "white";
        tiles.forEach(element => {
            element.innerText = ""
            element.classList.remove("playerX")
            element.classList.remove("player0")
        })
        if (currentPlayer =="O") changePlayer() //so the start player will be X
        announceResult.innerHTML = "";
        announceResult.classList.add("hide")
        gameActive =true;
        board = ["", "", "", "", "", "", "", "", ""]

    }

    function updateBoard(index) {
        board[index] = currentPlayer;
    }



    function resultValidation() {
        let round = false;
        for (let i = 0; i < 8; i++) {
            let temp = wining[i];
            let a = board[temp[0]]
            let b = board[temp[1]]
            let c = board[temp[2]]
            if (a == "" || b == "" || c == "") continue;
            if (a == b && b == c) {
                round = true;
                break;
            }

        }
        if (round) {
            announce(currentPlayer == "X" ? PLAYERX_WON : PLAYERO_WON)
            gameActive = false;
            background.style .backgroundColor = "aquamarine";
            return;
        }
        if (!board.includes("")) {
            background.style .backgroundColor = "aquamarine";
            announce(TIE)
        }
    }
    function announce(x) {
        switch (x) {
            case PLAYERX_WON:
                announceResult.innerHTML = `Player <span class="playerX">" X "</span> has won`
                break;
            case PLAYERO_WON:
                announceResult.innerHTML = `Player <span class="player0">" O "</span> has won`
                break;
            case TIE:
                announceResult.innerText = "It's a TIE"

        }
        announceResult.classList.remove("hide")
    }

}) 