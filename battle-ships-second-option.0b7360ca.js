!function(){function t(t){return t&&t.__esModule?t.default:t}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},o=e.parcelRequired7c6;null==o&&((o=function(t){if(t in r)return r[t].exports;if(t in n){var e=n[t];delete n[t];var o={id:t,exports:{}};return r[t]=o,e.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(t,e){n[t]=e},e.parcelRequired7c6=o),o.register("8slrw",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(t){if(Array.isArray(t))return t}})),o.register("7AJDX",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}})),o.register("ifqQW",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}})),o.register("auk6i",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(t,e){if(!t)return;if("string"==typeof t)return n.default(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n.default(t,e)};var r,n=(r=o("8NIkP"))&&r.__esModule?r:{default:r}})),o.register("8NIkP",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}}));var i={};Object.defineProperty(i,"__esModule",{value:!0}),i.default=function(t,e){return a.default(t)||s.default(t,e)||c.default(t,e)||u.default()};var a=l(o("8slrw")),s=l(o("7AJDX")),u=l(o("ifqQW")),c=l(o("auk6i"));function l(t){return t&&t.__esModule?t:{default:t}}var f=function(t){document.getElementById("messageArea").innerHTML=t},d=function(t){document.getElementById(t).classList.add("hit")},h=function(t){document.getElementById(t).classList.add("miss")},p={boardSize:7,numShips:7,shipsSunk:0,ships:[],fire:function(t){for(var e=0;e<this.numShips;e++){var r=this.ships[e],n=r.locations.indexOf(t);if(n>=0)return r.hits[n]="hit",d(t),f("HIT!"),this.isSunk(r)&&(f("You sank my battleship!"),this.shipsSunk++),!0}return h(t),f("You missed."),!1},isSunk:function(t){return t.hits.every((function(t){return"hit"===t}))},generateShipLocations:function(){for(var t,e=0;e<3;e++){do{t=this.generateShip(3)}while(this.collision(t));this.ships.push({locations:t,hits:Array(3).fill("")})}for(var r=0;r<4;r++){do{t=this.generateShip(1)}while(this.collision(t));this.ships.push({locations:t,hits:[""]})}},generateShip:function(t){var e,r,n=Math.floor(2*Math.random());1===n?(e=Math.floor(Math.random()*this.boardSize),r=Math.floor(Math.random()*(this.boardSize-t+1))):(r=Math.floor(Math.random()*this.boardSize),e=Math.floor(Math.random()*(this.boardSize-t+1)));for(var o=[],i=0;i<t;i++)1===n?o.push(e+""+(r+i)):o.push(e+i+""+r);return o},collision:function(t){for(var e=0;e<this.ships.length;e++)for(var r=this.ships[e],n=0;n<t.length;n++)for(var o=this.getAdjacentLocations(t[n]),i=0;i<o.length;i++)if(r.locations.indexOf(o[i])>=0)return!0;return!1},getAdjacentLocations:function(e){var r=t(i)(e.split("").map(Number),2),n=r[0],o=r[1],a=[];return a.push("".concat(n-1).concat(o)),a.push("".concat(n+1).concat(o)),a.push("".concat(n).concat(o-1)),a.push("".concat(n).concat(o+1)),a.push("".concat(n-1).concat(o-1)),a.push("".concat(n-1).concat(o+1)),a.push("".concat(n+1).concat(o-1)),a.push("".concat(n+1).concat(o+1)),a}};function m(t){var e=t.target,r=e.id,n=p.fire(r);e.removeEventListener("click",m),n&&p.shipsSunk===p.numShips&&(f("You sank all my battleships!"),v.forEach((function(t){t.removeEventListener("click",m)})))}var v=document.querySelectorAll(".board table td");v.forEach((function(t){t.addEventListener("click",m)})),p.generateShipLocations()}();
//# sourceMappingURL=battle-ships-second-option.0b7360ca.js.map