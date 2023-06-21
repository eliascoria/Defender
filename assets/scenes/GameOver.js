export default class GameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }
  create() {
    this.add
      .image(400, 300, "gameOver")
      .setScale(1);
      this.add
      .image(400, 500, "retrybtn")
      .setScale(1).setInteractive().on("pointerdown", () => this.scene.start("game"));
  }}