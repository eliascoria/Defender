export default class Win2 extends Phaser.Scene {
  constructor() {
    super("win2");
  }
  create() {
    this.add
      .image(400, 300, "winscene")
      .setScale(1);
      this.add
      .image(400, 500, "nlbtn")
      .setScale(1).setInteractive().on("pointerdown", () => this.scene.start("game3"));
  }}