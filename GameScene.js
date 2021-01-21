// GameScene that displays the actual game

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    // gradient background
    const background = this.add.graphics();
    background.fillGradientStyle(0x5ab9ea, 0x84ceeb, 0xc1c8e4, 0x8860d0, 1);
    background.fillRect(
      0,
      0,
      gameState.gameOptions.width,
      gameState.gameOptions.height
    );
  }
}
