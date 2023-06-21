export default class Menu extends Phaser.Scene {
  constructor() {
    super("menu");
  }
  create() {
    this.add
      .image(400, 300, "menu")
      .setScale(1);
      this.add.image(400,250, "play").setScale(0.70).setInteractive()
      .on("pointerdown",() => this.scene.start("game"));
      this.add.image(400,320, "help").setScale(0.50).setInteractive()
      .on("pointerdown",() => this.scene.start("helpscene"));
  }}