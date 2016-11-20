/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../../node_modules/phaser/typescript/pixi.d.ts"/>

import {StandardView} from './standard-view';
import {StandardModel} from './standard-model';
import {StandardController} from './standard-controller';
import {Model} from '../model/model';
import {View} from '../view/view';
import {Controller} from '../controller/controller';

export class Standard implements StandardView, StandardModel, StandardController {
    private _game:Phaser.Game;
    private _model:Model;
    private _view:View;
    private _controller:Controller;

    getGame() : Phaser.Game {
        return this._game;
    }

    getModel() : Model {
        return this._model;
    }

    getController() : Controller {
        return this._controller;
    }

    getView() : View {
        return this._view;
    }

    setGame(game:Phaser.Game) : void {
        this._game = game;
    }

    setModel(model:Model) : void {
        this._model = model;
    }

    setController(controller:Controller) : void {
        this._controller = controller;
    }

    setView(view:View) : void {
        this._view = view;
    }
}
