import {StandardView} from './standard-view';
import {StandardModel} from './standard-model';
import {StandardController} from './standard-controller';

export class Standard implements StandardView, StandardModel, StandardController {
    private _gameObjectFactory:Phaser.GameObjectFactory;

    getGameObjectFactory() : Phaser.GameObjectFactory {
        return this._gameObjectFactory;
    }

    setGameObjectFactory(gameObjectFactory:Phaser.GameObjectFactory) : void {
        this._gameObjectFactory = gameObjectFactory;
    }
}
