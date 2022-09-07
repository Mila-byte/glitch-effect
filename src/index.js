import "./styles.css";
import bg from "./img.webp";

class glitch {
  constructor() {
    const canvas = document.querySelector(".pixi");

    const app = new PIXI.Application({
      view: canvas,
      width: 600,
      height: 700,
      transparent: true
    });

    this.bg = new PIXI.Sprite(PIXI.Texture.from(bg));

    this.text = new PIXI.Text("SOME TEXT", {
      fontSize: 100,
      fill: 0xffff00,
      fontWeight: "600",
      align: "center"
    });

    this.text.scale.set(2);
    this.text.x = app.screen.width / 2 - 30;
    this.text.y = app.screen.height / 2;
    this.text.anchor.x = 0.5;
    this.text.anchor.y = 0.5;

    this.text.y = app.screen.height / 2 - 160;


    app.stage.addChild(this.bg, this.img);


    this.text.filters = [
      new PIXI.filters.GlitchFilter()
    ];

    this.text.filters[0].red.x = 0;
    this.text.filters[0].red.y = 0;
    this.text.filters[0].green.x = 0;
    this.text.filters[0].green.y = 0;
    this.text.filters[0].blue.x = 0;
    this.text.filters[0].blue.y = 0;


    this.text.filters[0].slices = 0;
    this.text.filters[0].offset = 2;
    this.anim = this.anim.bind(this);
    this.anim();
  }

  randomIntFromInterval(min, max) {
    return Math.random() * (max - min + 1) + min;
  }

  anim() {
    const THAT = this;

    const tl = gsap.timeline({
      delay: this.randomIntFromInterval(0, 2),
      onComplete: this.anim
    });

    tl.to([this.text.filters[0].red, this.text.filters[0].green], {
      duration: 0.5,
      x: this.randomIntFromInterval(-10, 10),
      y: this.randomIntFromInterval(-5, 5)
    });

    tl.to([this.text.filters[0].red, this.text.filters[0].green], {
      duration: 0.01,
      x: 0,
      y: 0
    });

    tl.to(
      this.text.filters[0].red,
      {
        duration: 0.5,
        x: this.randomIntFromInterval(-10, 10),
        y: 0,
        onComplete() {
          THAT.text.filters[0].slices = 12;
          THAT.text.filters[0].direction = 180;
        }
      },
      "-=0.2"
    );

    tl.to(this.text.filters[0].red, {
      duration: 0.5,
      x: this.randomIntFromInterval(-10, 10),
      y: this.randomIntFromInterval(-7, 7),
      onComplete() {
        THAT.text.filters[0].slices = 5;
        THAT.text.filters[0].direction = 180;
      }
    });

    tl.to(this.text.filters[0].blue, {
      duration: 0.5,
      x: this.randomIntFromInterval(-10, 10),
      y: 0
    });

    tl.to(this.text.filters[0].blue, {
      duration: 0.05,
      x: 0,
      y: 0,
      onComplete() {
        THAT.text.filters[0].slices = 0;
        THAT.text.filters[0].direction = 0;
      }
    });

    tl.to(
      this.text.filters[0].green,
      {
        duration: 0.5,
        x: this.randomIntFromInterval(-10, 10),
        y: 0
      },
      "-=0.2"
    );

    tl.to(this.text.filters[0].green, {
      duration: 1,
      x: this.randomIntFromInterval(-10, 10),
      y: this.randomIntFromInterval(-5, 5)
    });

    tl.to(this.text.filters[0].green, {
      duration: 0.5,
      x: 0,
      y: 0
    });

    tl.timeScale(1.3);
  }
}

new glitch();
