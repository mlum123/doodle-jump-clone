// global gameState object to hold variables to be accessed by diff functions
const gameState = {
  gameOptions: {
    width: 1400,
    height: 710,
    gravity: 800,
  },
};

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }
}

const config = {
  type: Phaser.AUTO,
  width: gameState.gameOptions.width,
  height: gameState.gameOptions.height,
  backgroundColor: "#D9DBF1",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: gameState.gameOptions.gravity },
    },
  },
  scene: GameScene,
};

game = new Phaser.Game(config);
