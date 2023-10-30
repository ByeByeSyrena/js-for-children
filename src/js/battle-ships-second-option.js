const view = {
  displayMessage: function (msg) {
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = msg;
  },
  displayHit: function (location) {
    const cell = document.getElementById(location);
    cell.classList.add('hit');
  },
  displayMiss: function (location) {
    const cell = document.getElementById(location);
    cell.classList.add('miss');
  },
};

const model = {
  boardSize: 7,
  numShips: 5,
  shipsSunk: 0,
  shipLength: 3,
  ships: [
    { locations: [0, 0, 0], hits: ['', '', ''] },
    { locations: [0, 0, 0], hits: ['', '', ''] },
    { locations: [0, 0, 0], hits: ['', '', ''] },
  ],
  fire: function (guess) {
    for (let i = 0; i < this.numShips; i++) {
      const ship = this.ships[i];
      const index = ship.locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = 'hit';
        view.displayHit(guess);
        view.displayMessage('HIT!');
        if (this.isSunk(ship)) {
          view.displayMessage('You sank my battleship!');
          this.shipsSunk++;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage('You missed.');
    return false;
  },
  isSunk: function (ship) {
    for (let i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== 'hit') {
        return false;
      }
    }
    return true;
  },
  generateShipLocations: function () {
    let locations;
    for (let i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
  },
  generateShip: function () {
    const direction = Math.floor(Math.random() * 2);
    let row, col;

    if (direction === 1) {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
    } else {
      col = Math.floor(Math.random() * this.boardSize);
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
    }

    let newShipLocations = [];
    for (let i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(row + '' + (col + i));
      } else {
        newShipLocations.push(row + i + '' + col);
      }
    }
    return newShipLocations;
  },
  collision: function (locations) {
    for (let i = 0; i < this.numShips; i++) {
      const ship = model.ships[i];
      for (let j = 0; j < locations.length; j++) {
        const adjacentLocations = this.getAdjacentLocations(locations[j]);
        for (let k = 0; k < adjacentLocations.length; k++) {
          if (ship.locations.indexOf(adjacentLocations[k]) >= 0) {
            return true;
          }
        }
      }
    }
    return false;
  },

  getAdjacentLocations: function (location) {
    const [row, col] = location.split('').map(Number);
    const adjacentLocations = [];

    adjacentLocations.push(`${row - 1}${col}`);
    adjacentLocations.push(`${row + 1}${col}`);
    adjacentLocations.push(`${row}${col - 1}`);
    adjacentLocations.push(`${row}${col + 1}`);

    adjacentLocations.push(`${row - 1}${col - 1}`);
    adjacentLocations.push(`${row - 1}${col + 1}`);
    adjacentLocations.push(`${row + 1}${col - 1}`);
    adjacentLocations.push(`${row + 1}${col + 1}`);

    return adjacentLocations;
  },
};

function handleCellClick(event) {
  const cell = event.target;
  const location = cell.id;
  const hit = model.fire(location);
  cell.removeEventListener('click', handleCellClick);
  if (hit && model.shipsSunk === model.numShips) {
    view.displayMessage('You sank all my battleships!');
  }
}

const cells = document.querySelectorAll('.board table td');
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

model.generateShipLocations();
