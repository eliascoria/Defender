import Game from "./assets/scenes/Game.js";
import Game2 from "./assets/scenes/Game2.js";
import Game3 from "./assets/scenes/Game3.js";
import GameOver from "./assets/scenes/GameOver.js";
import Help from "./assets/scenes/Help.js";
import Menu from "./assets/scenes/Menu.js";
import Preload from "./assets/scenes/Preload.js";
import Win from "./assets/scenes/Win.js";
import Win3 from "./assets/scenes/Win3.js";
import Win2 from "./assets/scenes/Win2.js";

// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: false,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [Preload, Game,Game2,Game3, Menu, GameOver, Help, Win, Win2, Win3 ],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);
