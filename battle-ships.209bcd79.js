!function(){var t=function(t){document.getElementById("messageArea").innerHTML=t},s=function(t){document.getElementById(t).setAttribute("class","hit")},e=function(t){document.getElementById(t).setAttribute("class","miss")},n={boardSize:7,numShips:3,shipsSunk:0,shipLength:3,ships:[{locations:["06","16","26"],hits:["","",""]},{locations:["24","34","44"],hits:["","",""]},{locations:["10","11","12"],hits:["","",""]}],fire:function(n){for(var i=0;i<this.numShips;i++){var o=this.ships[i],u=o.locations.indexOf(n);if(u>=0)return o.hits[u]="hit",s(n),t("HIT!"),this.isSunk(o)&&(t("You sank my battleship!"),this.shipsSunk++),!0}return e(n),t("You missed."),!1},isSunk:function(t){for(var s=0;s<this.shipLength;s++)if("hit"!==t.hits[s])return!1;return!0}},i={guesses:0,processGuess:function(s){var e=function(t){var s=["A","B","C","D","E","F","G"];if(null===t||2!==t.length)alert("Oops, please enter a letter and a number on the board.");else{var e=t.charAt(0).toUpperCase(),i=s.indexOf(e),o=t.charAt(1);if(isNaN(i)||isNaN(o))alert("Oops, that isn't on the board.");else{if(!(i<0||i>=n.boardSize||o>=n.boardSize))return i+o;alert("Oops, that's off the board!")}}return null}(s);e&&(this.guesses++,n.fire(e)&&n.shipsSunk===n.numShips&&t("You sank all my battleships, in "+this.guesses+" guesses"))}};function o(){var t=document.getElementById("guessInput"),s=t.value;i.processGuess(s),t.value=""}window.onload=function(){document.getElementById("fireButton").onclick=o}}();
//# sourceMappingURL=battle-ships.209bcd79.js.map