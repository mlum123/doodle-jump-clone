// GameScene that displays the actual game

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image("astronaut", "./img/005-space suit.png");
    this.load.image("rocket", "./img/030-space shuttle.png");
    this.load.image("comet", "./img/023-comet.png");
    this.load.image("alien", "./img/014-alien.png");
    this.load.image("pellet", "./img/circle.png");
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
      const randomX = Math.floor(Math.random() * 400) + 80;
      gameState.platforms.create(randomX, i * 120, "star").setScale(0.3);
    }

    // player-platform collision
    this.physics.add.collider(gameState.player, gameState.platforms);

    // define cursors from keyboard
    gameState.cursors = this.input.keyboard.createCursorKeys();

    // instructions
    this.add.text(
      688,
      100,
      " use the left and right arrow keys to move\n\n earn points by landing on platforms and using special boosters \n\n avoid space hazards! press the spacebar to aim",
      {
        fontSize: "20px",
        fontFamily: "Poppins, sans-serif",
      }
    );

    // attributions
    this.add.text(
      688,
      300,
      " thank you to dinosoft labs and freepik for the icons!",
      {
        fontSize: "20px",
        fontFamily: "Poppins, sans-serif",
        fontStyle: "italic",
      }
    );
  }

  update() {
    // if player falls to bottom, it's game over
    if (
      gameState.score > 0 &&
      gameState.player.y > gameState.gameOptions.height - 100
    ) {
      gameState.gameOver = true;
    }

    // if game over, show end scene
    if (gameState.gameOver) {
      this.scene.stop("GameScene");
      this.scene.start("EndScene");
    }

    // use keyboard input to control player
    if (gameState.cursors.left.isDown) {
      gameState.player.setVelocityX(-240);
      gameState.player.flipX = true;
    } else if (gameState.cursors.right.isDown) {
      gameState.player.setVelocityX(240);
      gameState.player.flipX = false;
    } else {
      gameState.player.setVelocityX(0);
    }

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

    // display score
    if (gameState.scoreDisplay !== undefined) {
      gameState.scoreDisplay.destroy();
    }

    gameState.scoreDisplay = this.add.text(
      45,
      50,
      `score: ${gameState.score}`,
      {
        fontSize: "25px",
        fontFamily: "Poppins, sans-serif",
      }
    );

    // every so often, give player a chance to have rocket booster
    if (
      gameState.rocketCount === 0 &&
      gameState.score !== 0 &&
      gameState.score % 15 === 0
    ) {
      gameState.rocket = this.physics.add
        .image(
          Math.floor(Math.random() * 400) + 50,
          Math.floor(Math.random() * 400),
          "rocket"
        )
        .setScale(0.2)
        .setGravityY(300);
      gameState.rocketCount = 1;
    }

    if (gameState.rocket && gameState.score % 15 === 7) {
      gameState.rocketCount = 0;
      gameState.player.setVelocityY(0);
    }

    // player-rocket collision, make player speed up
    this.physics.add.collider(gameState.player, gameState.rocket, () => {
      console.log("hit");
      gameState.score += 5;
      gameState.player.setBounce(3);
    });

    // every so often, send a comet down
    if (
      gameState.cometCount === 0 &&
      gameState.score !== 0 &&
      gameState.score % 8 === 0
    ) {
      gameState.comet = this.physics.add
        .image(Math.floor(Math.random() * 400) + 50, 0, "comet")
        .setScale(0.2)
        .setGravityY(200);
      gameState.cometCount = 1;
    }

    if (gameState.comet && gameState.score % 8 === 5) {
      gameState.cometCount = 0;
    }

    // player-comet collision, results in game over
    this.physics.add.collider(gameState.player, gameState.comet, () => {
      gameState.gameOver = true;
    });

    // every so often, send an alien down
    if (
      gameState.alienCount === 0 &&
      gameState.score !== 0 &&
      gameState.score % 12 === 0
    ) {
      gameState.alien = this.physics.add
        .image(Math.floor(Math.random() * 400) + 50, 0, "alien")
        .setScale(0.1)
        .setGravityY(50);
      gameState.alienCount = 1;
    }

    if (gameState.alien && gameState.score % 12 === 5) {
      gameState.alienCount = 0;
    }

    // player-alien collision, results in game over
    this.physics.add.collider(gameState.player, gameState.alien, () => {
      gameState.gameOver = true;
    });

    // when player presses spacebar, aim pellet up
    if (gameState.pelletCount === 0 && gameState.cursors.space.isDown) {
      gameState.pellet = this.physics.add
        .image(gameState.player.x, gameState.player.y, "pellet")
        .setScale(0.02)
        .setGravityY(-1700);
      gameState.pelletCount = 1;
    }

    if (gameState.pellet && gameState.score % 5 === 0) {
      gameState.pellet.destroy();
      gameState.pelletCount = 0;
    }

    if (gameState.pellet && gameState.alien) {
      // pellet-alien collision, results in alien getting destroyed
      this.physics.add.collider(gameState.pellet, gameState.alien, () => {
        gameState.alien.destroy();
        gameState.alienCount = 0;
      });
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
    platform.y = -(0.45 * platform.height);
    platform.x = Math.floor(Math.random() * 400) + 80;
  }
}
