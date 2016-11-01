import {StandardView} from './standard-view';
import {StandardModel} from './standard-model';
import {StandardController} from './standard-controller';

export class Standard implements StandardView, StandardModel, StandardController {
    private _game:Phaser.Game;

    constructor(game:Phaser.Game) {
        this._game = game;
    }

    get game() {
        return this._game;
    }
}
