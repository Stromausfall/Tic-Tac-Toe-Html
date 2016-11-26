import {Player} from './player';
import {TileState} from '../../model/tile/tile-state';
import {TileController} from '../../model/tile/tile-controller';
import {ModelController} from '../../model/model-controller';

export class HumanPlayer implements Player {
    private _tileState:TileState;
    private _model:ModelController;
    private _turnFinished;

    constructor(model:ModelController, tileState:TileState) {
        this._model = model;
        this._tileState = tileState;
        this._turnFinished = false;
    }

    tileClicked(x:number, y:number):void {
        var tile:TileController = this._model.getTile(x, y);

        // only change state if no one owns the tile yet
        if (tile.getState() == TileState.Empty) {
            tile.setState(this._tileState);
            this._turnFinished = true;
        }
    }

    isTurnFinished():boolean {
        return this._turnFinished;
    }

    startTurn():void {

    }
}