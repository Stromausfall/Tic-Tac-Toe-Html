import {ModelView} from '../model/model-view';

export interface StandardView {
    getGame() : Phaser.Game;
    getModel() : ModelView;
}