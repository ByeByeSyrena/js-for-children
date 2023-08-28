const view = {
    displayMessage: function (msg) {
        const messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function (location) {
        const cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function (location) {
        const cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    },
    
};


const model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    ships: [
        { locations: ["06", "16", "26"], hits: ["", "", "",] },
        { locations: ["24", "34", "44"], hits: ["", "", "",] },
        { locations: ["10", "11", "12"], hits: ["", "", "",] },
    ],
    fire: function (guess) {
        for (i = 0; i < this.numShips; i++){
            const ship = this.ships[i];
            const index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");
                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship!")
                    this.shipSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.")
        return false;
    },
    isSunk: function (ship) {
        for (i = 0; i < this.ship; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },
};


const controller = {
    guesses: 0,

    processGuess: function (guess) {
        const location = parseGuess(guess);
        if (location) {
            this.guesses++;
            const hit = model.fire(location);
        }
    }
};


function parseGuess(guess) {
    const alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    if (guess === null || guess.length !== 2) {
            alert("Oops, please enter a letter and a number on the board.");
        } else {
        const firstChar = guess.charAt(0);
        const row = alphabet.indexOf(firstChar);
        const column = guess.charAt(1);

        if (isNaN(row) || isNaN(column)) {
            alert("Oops, that isn't on the board.");
        } else if (row < 0 || row >= model.boardSize || column >= model.boardSize) {
            alert("Oops, that's off the board!")
        } else {
            return row + column;
        }
        return null;
     }
}

// model.fire("53");
// model.fire("16");
// model.fire("26");

// model.fire("34");
// model.fire("24");
// model.fire("44");

// model.fire("12");
// model.fire("11");
// model.fire("10");

// console.log(parseGuess("A0"));
// console.log(parseGuess("B6"));
// console.log(parseGuess("G3"));
// console.log(parseGuess("HO"));
// console.log(parseGuess("A7"));
