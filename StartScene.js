// StartScene that displays landing page
class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  preload() {
    this.load.image("star", "./img/006-falling star.png");
  }

  create() {
    // title text
    this.add.text(560, 180, "doodle jump", {
      fontSize: "50px",
      fontFamily: "Poppins, sans-serif",
    });
    this.add.text(610, 250, "in outer space", {
      fontFamily: "Poppins, sans-serif",
      fontSize: "30px",
      fontStyle: "italic",
    });

    // play button
    const playButton = this.add.rectangle(720, 360, 105, 60, 0xffffff);

    this.add.text(688, 340, "play", {
      fontSize: "30px",
      fontFamily: "Poppins, sans-serif",
      color: "0x000",
    });

    playButton.setInteractive();
    // make play button fade in and out on hover
    playButton.on("pointerover", () => {
      playButton.setScale(1.2);
    });

    playButton.on("pointerout", () => {
      playButton.setScale(1);
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

    // show next scene when user clicks on play button
    playButton.on("pointerup", () => {
      this.scene.stop("StartScene");
      this.scene.start("GameScene");
    });
  }
}
