const t=function(t){document.getElementById("messageArea").innerHTML=t},e=function(t){document.getElementById(t).classList.add("hit")},n=function(t){document.getElementById(t).classList.add("miss")},s=function(t){if(i.isSunk(t))if(1===t.locations.length){const t=document.getElementById("one-cell-counter"),e=parseInt(t.textContent);t.textContent=e+1}else if(3===t.locations.length){const t=document.getElementById("three-cell-counter"),e=parseInt(t.textContent);t.textContent=e+1}},i={boardSize:7,numShips:6,shipsSunk:0,ships:[],fire:function(i){for(let n=0;n<this.numShips;n++){const o=this.ships[n],h=o.locations.indexOf(i);if(h>=0)return o.hits[h]="hit",e(i),t("HIT!"),s(o),this.isSunk(o)&&(t("You sank my battleship!"),this.shipsSunk++),!0}return n(i),t("You missed."),!1},isSunk:function(t){return t.hits.every((t=>"hit"===t))},generateShipLocations:function(){let t;for(let e=0;e<3;e++){do{t=this.generateShip(3)}while(this.collision(t));this.ships.push({locations:t,hits:Array(3).fill("")})}for(let e=0;e<3;e++){do{t=this.generateShip(1)}while(this.collision(t));this.ships.push({locations:t,hits:[""]})}},generateShip:function(t){const e=Math.floor(2*Math.random());let n,s;1===e?(n=Math.floor(Math.random()*this.boardSize),s=Math.floor(Math.random()*(this.boardSize-t+1))):(s=Math.floor(Math.random()*this.boardSize),n=Math.floor(Math.random()*(this.boardSize-t+1)));let i=[];for(let o=0;o<t;o++)1===e?i.push(n+""+(s+o)):i.push(n+o+""+s);return i},collision:function(t){for(let e=0;e<this.ships.length;e++){const n=this.ships[e];for(let e=0;e<t.length;e++){const s=this.getAdjacentLocations(t[e]);for(let t=0;t<s.length;t++)if(n.locations.indexOf(s[t])>=0)return!0}}return!1},getAdjacentLocations:function(t){const[e,n]=t.split("").map(Number),s=[];return s.push(`${e-1}${n}`),s.push(`${e+1}${n}`),s.push(`${e}${n-1}`),s.push(`${e}${n+1}`),s.push(`${e-1}${n-1}`),s.push(`${e-1}${n+1}`),s.push(`${e+1}${n-1}`),s.push(`${e+1}${n+1}`),s}};function o(e){const n=e.target,s=n.id,r=i.fire(s);n.removeEventListener("click",o),r&&i.shipsSunk===i.numShips&&(t("You sank all my battleships!"),h.forEach((t=>{t.removeEventListener("click",o)})))}const h=document.querySelectorAll(".board table td");h.forEach((t=>{t.addEventListener("click",o)})),i.generateShipLocations();
//# sourceMappingURL=battle-ships-second-option.dbebda25.js.map
