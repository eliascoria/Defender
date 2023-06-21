export default class Game extends Phaser.Scene {
  score;
  gameOver;
  timer;
  constructor() {
    super("game");
  }

  init() {
    this.gameOver = false;
  }
  create() {
   //add sound
    //add background
    this.add.image(400, 300, "background1").setScale(1);
    //add sprites player
    this.explosion = this.add.sprite("explosion").setScale(1);
    this.player = this.physics.add.sprite(400, 500, "nave").setScale(0.20);
    this.player.setCollideWorldBounds(true);
    this.player.body.allowGravity = false;


    //add bonus
    this.bonus1 = this.physics.add.group();
    this.time.addEvent({
      delay: 8000,
      callback: this.spawnBonus1,
      callbackScope: this,
      loop: true,
    })
    this.bonus2 = this.physics.add.group();
    this.time.addEvent({
      delay: 10000,
      callback: this.spawnBonus2,
      callbackScope: this,
      loop: true,
    })


    //add enemies
    this.enemy = this.physics.add.group();
    //add enemies event
    this.time.addEvent({
      delay: 3000,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    })
    //create cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    //add shoot
    this.shoot = this.physics.add.group({
      collideWorldBounds: false,
    });
    //add collider //add overlap between bullets and enemies
    this.physics.add.collider(this.player, this.enemy);
    this.physics.add.collider(this.shoot, this.enemy);
    this.physics.add.overlap(
      this.shoot,
      this.enemy,
      this.destroyEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy,
      this.playerDeath,
      null,
      this
    );
    //add score on scene
    // add timer
    this.time.addEvent({
      delay: 1000,
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    });
    this.timer = 30;
    this.timerText = this.add.text(750, 20, this.timer, {
      fontsize: "32px",
      fontstyle: "bold",
      fill: "#FFFFFF",
    });
  }
  update() {
    // if (this.score > 100) {
    //   this.scene.start("Win");
    // }
    if (this.gameOver) {
      this.scene.start("gameOver");
    }
    //update player movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-430);
    } else {
      if (this.cursors.right.isDown) {
        this.player.setVelocityX(430);
      } else {
        this.player.setVelocityX(0);
      }
    }
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-430);
    } else {
      if (this.cursors.down.isDown) {
        this.player.setVelocityY(430);  
      } else {
        this.player.setVelocityY(0);
      }
    }
    //SHOOT
    if(this.cursors.space.isDown){
      this.shoot.create(this.player.x, this.player.y, "bala").setVelocityY(-500);
    }
  }
  spawnEnemy(){
    const randomX = Phaser.Math.RND.between(0,800);
    this.enemy.create(randomX, 0, "enemy").setCircle(35, 40, 25);
    console.log("enemy spawned", randomX);
  }
  spawnBonus1(){
    const randomX = Phaser.Math.RND.between(0,800);
    this.bonus1 = this.add.sprite(randomX, 0,'velocity');
    this.bonus1.anims.play('velocityanimation');
    console.log("bonus spawned", randomX);
  }
  spawnBonus2(){
    const randomX = Phaser.Math.RND.between(0,800);
    this.bonus2 = this.add.sprite(randomX, 0,'extrapoints');
    this.bonus2.anims.play('pointsanimation');
    console.log("bonus spawned", randomX);
  }
  destroyEnemy(shoot, enemy){
    enemy.disableBody(true, true);
    shoot.disableBody(true, true);
  }
  playerDeath(player, enemy){
    this.gameOver = true
  }
  onSecond() {
    this.timer--;
    this.timerText.setText(this.timer);
    if (this.timer <= 0) {
      this.gameOver = true;
    }
  }
}