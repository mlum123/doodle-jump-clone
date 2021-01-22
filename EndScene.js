// EndScene that displays ending message and score
class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: "EndScene" });
  }

  create() {
    // title text
    this.add.text(560, 115, "game over!", {
      fontSize: "50px",
      fontFamily: "Poppins, sans-serif",
    });
    this.add.text(553, 185, gameState.gameOverMessage, {
      fontSize: "20px",
      fontFamily: "Poppins, sans-serif",
    });
    this.add.text(610, 250, `final score: ${gameState.score}`, {
      fontFamily: "Poppins, sans-serif",
      fontSize: "30px",
      fontStyle: "italic",
    });

    // restart button
    const restartButton = this.add.rectangle(720, 360, 130, 60, 0xffffff);

    this.add.text(672, 340, "restart", {
      fontSize: "30px",
      fontFamily: "Poppins, sans-serif",
      color: "0x000",
    });

    restartButton.setInteractive();
    // make play button fade in and out on hover
    restartButton.on("pointerover", () => {
      restartButton.setScale(1.2);
    });

    restartButton.on("pointerout", () => {
      restartButton.setScale(1);
    });

    // shooting star icon
    const star = this.add
      .image(725, 410, "star")
      .setScale(0.2)
      .setFlip(true, true);
    this.tweens.add({
      targets: star,
      angle: 30,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    // restart when user clicks on restart button
    restartButton.on("pointerup", () => {
      // reset gameOver status and score
      gameState.gameOver = false;
      gameState.score = 0;
      gameState.rocketCount = 0;
      gameState.cometCount = 0;
      gameState.alienCount = 0;
      gameState.pelletCount = 0;

      this.scene.stop("EndScene");
      this.scene.start("StartScene");
    });
  }
}
