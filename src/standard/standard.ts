/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../../node_modules/phaser/typescript/pixi.d.ts"/>

import {StandardView} from './standard-view';
import {StandardModel} from './standard-model';
import {StandardController} from './standard-controller';
import {Model} from '../model/model';

export class Standard implements StandardView, StandardModel, StandardController {
    private _game:Phaser.Game;
    private _model:Model;

    getGame() : Phaser.Game {
        return this._game;
    }

    getModel() : Model {
        return this._model;
    }

    setGame(game:Phaser.Game) : void {
        this._game = game;
    }

    setModel(model:Model) : void {
        this._model = model;
    }
}
