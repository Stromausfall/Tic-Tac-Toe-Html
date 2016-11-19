import {ControllerView} from './controller-view';
import {StandardController} from '../standard/standard-controller';
import {ModelController} from '../model/model-controller';
import {TileController} from '../model/tile/tile-controller';
import {TileState} from '../model/tile/tile-state';

export class Controller implements ControllerView {
    private _standard:StandardController;

    constructor(standard:StandardController) {
        this._standard = standard;
    }

    private getModel() : ModelController {
        return this._standard.getModel();
    }

    tileClicked(x:number, y:number):void {
        var tile:TileController = this.getModel().getTile(x, y);

        // todo: the player/computer controller needs to do that...
        tile.setState(TileState.Circle);
    }

    initialize() : void {
        this.getModel().initialize();
    }
}