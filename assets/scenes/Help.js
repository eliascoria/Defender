export default class Help extends Phaser.Scene {
  constructor() {
    super("helpscene");
  }
  create() {
    this.add
      .image(400, 300, "helpscene")
      .setScale(1);
      this.bonus1 = this.add.sprite(270, 385, 'velocity');
      this.bonus1.anims.play('velocityanimation');
      this.bonus1 = this.add.sprite(275, 470, 'extrapoints');
      this.bonus1.anims.play('pointsanimation');
      this.add.image(400,550, "play").setScale(0.40).setInteractive()
      .on("pointerdown",() => this.scene.start("game"));
  }}