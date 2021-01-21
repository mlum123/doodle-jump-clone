// set up Phaser.js game

// global gameState object to hold variables to be accessed by diff functions
const gameState = {
  gameOptions: {
    width: 1425,
    height: 710,
    gravity: 800,
  },
  score: 0,
};

const config = {
  type: Phaser.AUTO,
  width: gameState.gameOptions.width,
  height: gameState.gameOptions.height,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: gameState.gameOptions.gravity },
    },
  },
  scene: [StartScene, GameScene],
};

const game = new Phaser.Game(config);
