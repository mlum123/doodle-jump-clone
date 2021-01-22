// GameScene that displays the actual game

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image("astronaut", "./img/005-space suit.png");
  }

  create() {
    this.physics.world.setBounds(0, 0, 550, 710);

    // create player
    gameState.player = this.physics.add
      .sprite(100, 450, "astronaut")
      .setScale(0.2);
    gameState.player.setCollideWorldBounds(true);
    gameState.player.setBounce(1);
    gameState.player.body.checkCollision.up = false;
    gameState.player.body.checkCollision.left = false;
    gameState.player.body.checkCollision.right = false;

    // create randomly placed platforms, with spacing that increases with score
    gameState.platforms = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    for (let i = 0; i < 8; i++) {
      const randomX = Math.floor(Math.random() * 400) + 50;
      gameState.platforms.create(randomX, i * 100, "star").setScale(0.3);
    }

    // player-platform collision
    this.physics.add.collider(gameState.player, gameState.platforms);

    // define cursors from keyboard
    gameState.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // factor in keyboard input
    if (gameState.cursors.left.isDown) {
      gameState.player.setVelocityX(-240);
      gameState.player.flipX = true;
    } else if (gameState.cursors.right.isDown) {
      gameState.player.setVelocityX(240);
      gameState.player.flipX = false;
    } else {
      gameState.player.setVelocityX(0);
    }

    if (gameState.scoreDisplay !== undefined) {
      gameState.scoreDisplay.destroy();
    }

    gameState.scoreDisplay = this.add.text(
      50,
      50,
      `score: ${gameState.score}`,
      {
        fontSize: "25px",
        fontFamily: "Poppins, sans-serif",
      }
    );

    // have player bounce off of platforms to move up
    if (gameState.player.body.touching.down) {
      gameState.player.setVelocityY(-500);
      gameState.score += 1;
      this.cameras.main.shake(100, 0.004);
    }

    // move platforms downward as player progresses upward
    if (gameState.player.body.y < gameState.gameOptions.height / 2) {
      gameState.platforms.children.iterate(updateY, this);
    }
  }
}

// updateY function moves platforms downward off the screen, then repositions them to show new platforms
function updateY(platform) {
  // keep player in center of screen
  let delta = Math.floor(gameState.gameOptions.height / 2) - gameState.player.y;

  if (delta > 0) {
    platform.y += delta / 30; // ensures delta is small enough
  }

  if (platform.y > gameState.gameOptions.height) {
    platform.y = -(0.3 * platform.height);
    platform.x = Math.floor(Math.random() * 400) + 50;
  }
}
