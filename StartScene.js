// StartScene that displays landing page / instructions
class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene " });
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

    // title text
    const title = this.add.text(560, 200, "doodle jump", {
      fontSize: "50px",
      fontFamily: "Poppins, sans-serif",
    });

    // play button
    const playButton = this.add.rectangle(720, 350, 105, 60);
    playButton.setStrokeStyle(4, 0xffffff);

    const playText = this.add.text(688, 330, "play", {
      fontSize: "30px",
      fontFamily: "Poppins, sans-serif",
    });

    playButton.setInteractive();
    // make play button fade in and out on hover
    playButton.on("pointerover", () => {
      this.tweens.add({
        targets: [playButton, playText],
        duration: 1200,
        alpha: 0.3,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      });
    });

    // show next scene when user clicks on play button
    playButton.on("pointerup", () => {
      this.scene.stop("StartScene");
      this.scene.start("GameScene");
    });
  }
}
