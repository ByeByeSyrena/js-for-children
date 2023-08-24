// const randomLoc = Math.floor(Math.random() * 5);

// const location1 = randomLoc;
// let location2 = location1 + 1;
// let location3 = location2 + 1;

// let guess = undefined;
// let hits = 0;
// let guesses = 0;

// let isSunk = false;

// while (isSunk == false) {
//     guess = prompt("Ready, aim, fire! (enter a number from 0-6):");
    
//     if (guess < 0 || guess > 6) {
//         alert("Please enter a valid cell number!");
//     } else {
//         guesses += 1;

//         if (guess == location1 || guess == location2 || guess == location3) {
//         hits += 1;
//             alert("HIT!");
        
//             if (hits == 3) {
//         isSunk = true;
//             alert("You sunk my battleship!");
//         };
//         } else {
//         alert("MISS!");
//     };
//     };
//     }

// const stats = "You took " + guesses + "guesses to sink the battleship, " + "which means you shooting accuracy was " + (3 / guesses);
// alert(stats);
