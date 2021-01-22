// set up Phaser.js game

// global gameState object to hold variables to be accessed by diff functions
const gameState = {
  gameOptions: {
    width: 1425,
    height: 710,
    gravity: 800,
  },
  score: 0,
  gameOver: false,
  rocketCount: 0,
  cometCount: 0,
  alienCount: 0,
  pelletCount: 0,
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
  scene: [StartScene, GameScene, EndScene],
};

const game = new Phaser.Game(config);
