export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() 
  {
    this.load.image("background1","./assets/images/background1.png");
    this.load.image("background2","./assets/images/background2.png");
    this.load.image("background3","./assets/images/background3.png");
    this.load.image("nave","./assets/images/nave defender.png");
    this.load.image("enemy","./assets/images/subditos.png");
    this.load.image("enemy2","./assets/images/enemy2.png");
    this.load.image("boss","./assets/images/nave nodriza.png");
    this.load.image("bala","./assets/images/bala.png");
    this.load.image("explosion","./assets/images/explosion.png");
    this.load.image("gameOver","./assets/images/gameover.png");
    this.load.image("menu","./assets/images/menu.png");
    this.load.image("play","./assets/images/playbutton.png");
    this.load.image("help","./assets/images/helpbutton.png");
    this.load.image("helpscene","./assets/images/HELP.png");
    this.load.image("retrybtn","./assets/images/retry.png");
    this.load.image("winscene","./assets/images/winscene.png");
    this.load.image("gamewin","./assets/images/gamewin.png");
    this.load.image("nlbtn","./assets/images/nextlevelbtn.png");
    this.load.image("back","./assets/images/backbtn.png");
    this.load.image("platform","./assets/images/platform.png");
    this.load.audio("shoots","./assets/sounds/shootsound.wav")

    this.load.spritesheet("velocity","./assets/images/Bonus1.png", {
      frameWidth: 95,
      frameHeight: 95,
    });
    this.load.spritesheet("extrapoints","./assets/images/Bonus2.png", {
      frameWidth: 95,
      frameHeight: 95,
    });

  
  }
  
  
  create() {
    // this.bonus1 = this.anims.create({
    //   key: "velocityanimation",
    //   frames: this.anims.generateFrameNumbers("velocity", {start: 0, end: 1}),
    //   frameRate: 10,
    //   repeat: -1,
    //   yoyo: true,
    // })
    // this.bonus2 = this.anims.create({
    //   key: "pointsanimation",
    //   frames: this.anims.generateFrameNumbers("extrapoints", {start: 0, end: 1}),
    //   frameRate: 10,
    //   repeat: -1,
    //   yoyo: true,
    // })
    //game
    this.scene.start("menu")
  }}