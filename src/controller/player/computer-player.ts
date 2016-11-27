import {Player} from './player';
import {TileState} from '../../model/tile/tile-state';
import {TileController} from '../../model/tile/tile-controller';
import {ModelController} from '../../model/model-controller';

export class ComputerPlayer implements Player {
    private _tileState:TileState;
    private _model:ModelController;

    constructor(model:ModelController, tileState:TileState) {
        this._model = model;
        this._tileState = tileState;
    }

    private getRandomCoordinate() : number {
        // random int between 0...3
        return Math.floor(Math.random() * 3);
    }

    tileClicked(x:number, y:number):void {
        // interaction with the GUI doesn't influence the computer player !
    }

    isTurnFinished():boolean {
        return true;
    }

    private getFreeTile() {
        while(true) {
            var x:number = this.getRandomCoordinate();
            var y:number = this.getRandomCoordinate();

            var tile:TileController = this._model.getTile(x, y);

            if (tile.getState() == TileState.Empty) {
                return tile;
            }
        }
    }

    startTurn():void {
        var tile:TileController = this.getFreeTile();

        tile.setState(this._tileState);
    }
}