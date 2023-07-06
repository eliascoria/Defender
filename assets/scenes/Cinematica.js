export default class Cinematica extends Phaser.Scene {
  constructor() {
    super("cinematicascene");
  }
  create() {
    this.add
      .image(400, 300, "cinemascene");
      this.add
      .image(680, 550, "nlbtn")
      .setScale(0.50).setInteractive().on("pointerdown", () => this.scene.start("game"));
  }}