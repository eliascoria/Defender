export default class Game2 extends Phaser.Scene {
  score;
  gameOver;
  timer;
  vel;
  constructor() {
    super("game2");
  }

  init() {
    this.gameOver = false;
    this.score = 0;
    this.vel= 430;
  }
  create() {
   //add sound
   this.soundshoot = this.sound.add("shoots");
   this.bonussound = this.sound.add("bonussound");
   this.explosionsound = this.sound.add("explosionsound");
   this.music = this.sound.add("musicgame");
   this.music.stop();
   this.music.play();
    //add background
    this.add.image(400, 300, "background2").setScale(1);
    let platform = this.physics.add.staticGroup();
    platform.create(400, 640, "platform").setScale(1).refreshBody();
    //add sprites player
    // this.explosion = this.add.sprite("explosion").setScale(1);
    this.player = this.physics.add.sprite(400, 500, "nave").setScale(0.20);
    this.player.setCollideWorldBounds(true);
    this.player.body.allowGravity = false;


    //add bonus
    this.bonus1 = this.physics.add.group();
    this.time.addEvent({
      delay: 45000,
      callback: this.spawnBonus1,
      callbackScope: this,
      loop: true,
    })
    this.bonus2 = this.physics.add.group();
    this.time.addEvent({
      delay: 30000,
      callback: this.spawnBonus2,
      callbackScope: this,
      loop: true,
    })
    //add platform
    
    //add enemies
    this.enemy = this.physics.add.group();
    //add enemies event
    this.time.addEvent({
      delay: 3000,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    })
    this.time.addEvent({
      delay: 5000,
      callback: this.spawnEnemy2,
      callbackScope: this,
      loop: true,
    })
    //create cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    //add shoot
    this.shoot = this.physics.add.group({
      collideWorldBounds: false,
    })
  

    //add collider //add overlap between bullets and enemies
    this.physics.add.collider(this.player, this.enemy);
    this.physics.add.collider(this.shoot, this.enemy);
    this.physics.add.collider(this.enemy, platform);
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

    this.physics.add.overlap(
      this.player,
      this.bonus1,
      this.playerVelocity,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.bonus2,
      this.extraPoint,
      null,
      this
    );
    this.physics.add.overlap(
      this.enemy,
      platform,
      this.reduce,
      null,
      this
    )

    //add score on scene
    this.scoreText = this.add.text(20, 20, "Score:" + this.score, {
      fontsize: "32px",
      fontstyle: "bold",
      fill: "#FFFFFF",
    });
    // add timer
    this.time.addEvent({
      delay: 1000,
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    });
    this.timer = 60;
    this.timerText = this.add.text(750, 20, this.timer, {
      fontsize: "32px",
      fontstyle: "bold",
      fill: "#FFFFFF",
    });
  }
  update() {
    if (this.score >= 200) {
      this.scene.start("win2");
      this.music.stop();
    }
    if (this.gameOver) {
      this.scene.start("gameOver");
      this.music.stop();
    }
    //update player movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-this.vel);
    } else {
      if (this.cursors.right.isDown) {
        this.player.setVelocityX(this.vel);
      } else {
        this.player.setVelocityX(0);
      }
    }
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-this.vel);
    } else {
      if (this.cursors.down.isDown) {
        this.player.setVelocityY(this.vel);  
      } else {
        this.player.setVelocityY(0);
      }
    }
    //SHOOT
    if(this.cursors.space.isDown){
      this.shoot.create(this.player.x, this.player.y, "bala").setVelocityY(-500).setGravityY(-700);
      this.soundshoot.play();
    }
  }
  spawnEnemy(){
    const randomX = Phaser.Math.RND.between(0,800);
    this.enemy.create(randomX +200 , 0, "enemy").setCircle(35, 40, 25).setCollideWorldBounds(true);
    console.log("enemy spawned", randomX);
  }
  spawnEnemy2(){
    const randomX = Phaser.Math.RND.between(0,800);
    this.enemy.create(randomX, 0, "enemy2").setCircle(35, 40, 25).setGravityY(300).setCollideWorldBounds(true);
    console.log("enemy spawned", randomX);
  }
  spawnBonus1(){
    const randomX = Phaser.Math.RND.between(0,800);
    this.bonus1.create(randomX, 0,'velocity').anims.play('velocityanimation').setCircle(40, 12, 10).setVelocity(50, 100).setBounce(1.1).setCollideWorldBounds(true);
    // this.bonus1.anims.play('velocityanimation');
    console.log("bonus spawned", randomX);
  }
  spawnBonus2(){
    const randomX = Phaser.Math.RND.between(0,800);
    this.bonus2.create(randomX, 0,'extrapoints').anims.play('pointsanimation').setCircle(40, 12, 10).setVelocity(50, 100).setBounce(1.1).setCollideWorldBounds(true);
    // this.bonus2.anims.play('pointsanimation');
    console.log("bonus spawned", randomX);
  }
  destroyEnemy(shoot, enemy){
    enemy.disableBody(true, true);
    shoot.disableBody(true, true);
    this.score += 20;
    this.scoreText.setText("Score: " + this.score);
    this.explosionsound.play();

  }
  playerDeath(player, enemy){
    this.gameOver = true;
    this.explosionsound.play();
  }
  resetVelocity(){
    this.vel = 430
  }
  playerVelocity(player, bonus1){
    this.vel = 1000;
    bonus1.disableBody(true,true);
    this.timeEvent = this.time.addEvent({
      delay: 4000,
      callback: this.resetVelocity,
      callbackScope: this,
      repeat: 1,
    })
    this.bonussound.play();
  }
  extraPoint(player, bonus2){
    bonus2.disableBody(true,true);
    this.score += 100;
    this.scoreText.setText("Score: " + this.score);
    this.bonussound.play();
  }
  reduce(enemy, platform){
    enemy.disableBody(true, true);
    this.score -= 20;
    this.scoreText.setText("Score: " + this.score);
    const text = this.add.text(
      enemy.body.position.x + 10,
      enemy.body.position.y,
      "-20",
      {
        fontSize: "22px",
        fontStyle: "bold",
        fill: "red",
      }
    )
    setTimeout(() => {
      text.destroy();},
      200);
    }
  onSecond() {
    this.timer--;
    this.timerText.setText(this.timer);
    if (this.timer <= 0) {
      this.gameOver = true;
    }
  }
}