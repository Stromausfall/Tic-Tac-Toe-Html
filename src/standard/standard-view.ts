import {ModelView} from '../model/model-view';
import {ControllerView} from '../controller/controller-view';

export interface StandardView {
    getGame() : Phaser.Game;
    getModel() : ModelView;
    getController() : ControllerView;
}