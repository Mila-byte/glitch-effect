import "./styles.css";
import Image from "./image.png";
import ImageBG from "./img.webp";

class glitch {
  constructor(el) {
    
    const imgLink =
      "https://images.unsplash.com/photo-1546465282-0b4b7b64edf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    const canvas = document.querySelector(".pixi");

    const app = new PIXI.Application({
      view: canvas,
      width: 600,
      height: 700,
      transparent: true
    });

    const textureBG = PIXI.Texture.from(ImageBG);
    this.imgBG = new PIXI.Sprite(textureBG);

    this.img = new PIXI.Text("SOME TEXT", {
      fontSize: 100,
      fill: 0xffff00,
      fontWeight: "600",
      align: "center"
    });

    this.imgBG.scale.set(2);
    this.imgBG.x = app.screen.width / 2 - 30;
    this.imgBG.y = app.screen.height / 2;
    this.imgBG.anchor.x = 0.5;
    this.imgBG.anchor.y = 0.5;

    this.img.y = app.screen.height / 2 - 160;

    
    app.stage.addChild(this.imgBG, this.img);

   
    this.img.filters = [
      new PIXI.filters.GlitchFilter()
    ];

    this.img.filters[0].red.x = 0;
    this.img.filters[0].red.y = 0;
    this.img.filters[0].green.x = 0;
    this.img.filters[0].green.y = 0;
    this.img.filters[0].blue.x = 0;
    this.img.filters[0].blue.y = 0;

    
    this.img.filters[0].slices = 0;
    this.img.filters[0].offset = 2;
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

    tl.to([this.img.filters[0].red, this.img.filters[0].green], {
      duration: 0.5,
      x: this.randomIntFromInterval(-10, 10),
      y: this.randomIntFromInterval(-5, 5)
    });

    tl.to([this.img.filters[0].red, this.img.filters[0].green], {
      duration: 0.01,
      x: 0,
      y: 0
    });

    tl.to(
      this.img.filters[0].red,
      {
        duration: 0.5,
        x: this.randomIntFromInterval(-10, 10),
        y: 0,
        onComplete() {
          THAT.img.filters[0].slices = 12;
          THAT.img.filters[0].direction = 180;

          // console.log(THAT.img.filters[1].slices)
        }
      },
      "-=0.2"
    );

    tl.to(this.img.filters[0].red, {
      duration: 0.5,
      x: this.randomIntFromInterval(-10, 10),
      y: this.randomIntFromInterval(-7, 7),
      onComplete() {
        THAT.img.filters[0].slices = 5;
        THAT.img.filters[0].direction = 180;
      }
    });

    tl.to(this.img.filters[0].blue, {
      duration: 0.5,
      x: this.randomIntFromInterval(-10, 10),
      y: 0
    });

    tl.to(this.img.filters[0].blue, {
      duration: 0.05,
      x: 0,
      y: 0,
      onComplete() {
        THAT.img.filters[0].slices = 0;
        THAT.img.filters[0].direction = 0;
      }
    });

    tl.to(
      this.img.filters[0].green,
      {
        duration: 0.5,
        x: this.randomIntFromInterval(-10, 10),
        y: 0
      },
      "-=0.2"
    );

    tl.to(this.img.filters[0].green, {
      duration: 1,
      x: this.randomIntFromInterval(-10, 10),
      y: this.randomIntFromInterval(-5, 5)
    });

    tl.to(this.img.filters[0].green, {
      duration: 0.5,
      x: 0,
      y: 0
    });

    tl.timeScale(1.3);
  }
}
new glitch();
