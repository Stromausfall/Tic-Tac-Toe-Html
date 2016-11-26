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

class SimpleGame {
  game: Phaser.Game;
  standard:Standard;

  constructor() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, "content", this);
  }

  preload() {
    this.game.load.image(ImageConstants.TILE_EMPTY, ImageConstants.TILE_EMPTY_FILE);
    this.game.load.image(ImageConstants.TILE_CROSS, ImageConstants.TILE_CROSS_FILE);
    this.game.load.image(ImageConstants.TILE_CIRCLE,  ImageConstants.TILE_CIRCLE_FILE);
  }

  create() {
    // the DI container
    this.standard = new Standard();

    // initialize the layers
    var model:Model = new Model();
    var view:View = new View(this.standard);
    var controller:Controller = new Controller(this.standard);

    // store the layers in the DI container
    this.standard.setGame(this.game);
    this.standard.setController(controller);
    this.standard.setModel(model);
    this.standard.setView(view);

    // start the game
    controller.initialize();
    controller.startTurnOfCurrentPlayer();
  }
  
  update() {
    this.game.input.update();
  }
}

window.onload = () => {
  const game = new SimpleGame();
};