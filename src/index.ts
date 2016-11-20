/// <reference path="../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../node_modules/phaser/typescript/pixi.d.ts"/>

import 'pixi';
import 'p2';
import * as Phaser from 'phaser';
import {View} from './view/view'
import {Controller} from './controller/controller';
import {Model} from './model/model';
import {Standard} from './standard/standard'
import {ImageConstants} from './view/image-constants';
import {StandardController} from './standard/standard-controller'


  function listener() {
console.debug("just clicked!");
}

class SimpleGame {
  game: Phaser.Game;
  logo: Phaser.Sprite;
  cursors: Phaser.CursorKeys;

  standard:Standard;

  constructor() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, "content", this);
  }

  preload() {
    this.game.load.image("logo", "./assets/images/mushroom2.png");

    
    this.game.load.image(ImageConstants.TILE_EMPTY, ImageConstants.TILE_EMPTY_FILE);
    this.game.load.image(ImageConstants.TILE_CROSS, ImageConstants.TILE_CROSS_FILE);
    this.game.load.image(ImageConstants.TILE_CIRCLE,  ImageConstants.TILE_CIRCLE_FILE);
  }

  create() {
    this.standard = new Standard();

    var model:Model = new Model();
    var view:View = new View(this.standard);
    var controller:Controller = new Controller(this.standard);

    this.standard.setGame(this.game);
    this.standard.setController(controller);
    this.standard.setModel(model);



    controller.initialize();


//this.game.stage.backgroundColor = "#FFFFFF";
    var y:StandardController = null;

    this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "logo");

    this.logo.inputEnabled = true;
    this.logo.input.pixelPerfectClick = true;

    this.logo.anchor.setTo(0.5, 0.5);
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.logo.events.onInputDown.add(() => { this.listener2(); }, this);
    this.logo.events.onInputDown.add(listener, this);
    this.logo.events.onInputDown.add(listener, this);
    this.logo.events.onInputDown.add(() => { console.debug("oi oi !") }, this);
  }

   listener2() {
console.debug("just clicked2!");
}

  update() {
    this.game.input.update();

    if (this.cursors.down.isDown)
      this.logo.position.y += 10;
    if (this.cursors.up.isDown)
      this.logo.position.y -= 10;
    if (this.cursors.left.isDown)
      this.logo.position.x -= 10;
    if (this.cursors.right.isDown)
      this.logo.position.x += 10;
  }
}

window.onload = () => {
  const game = new SimpleGame();
};