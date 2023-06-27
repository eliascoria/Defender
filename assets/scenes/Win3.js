export default class Win3 extends Phaser.Scene {
  constructor() {
    super("win3");
  }
  create() {
    this.add
      .image(400, 300, "gamewin")
      .setScale(1);
      this.add
      .image(400, 550, "back")
      .setScale(0.40).setInteractive().on("pointerdown", () => this.scene.start("menu"));
  }}