import {TileController} from './tile-controller';
import {TileView} from './tile-view';
import {TileState} from './tile-state';

export class Tile implements TileController, TileView {
    private _state:TileState;

    constructor() {
        this._state = TileState.Empty;
    }

    getState() : TileState {
        return this._state;
    }

    setState(tileState:TileState) : void {
        if (this._state == TileState.Empty) {
            this._state = tileState;
        }
    }

    resetState() : void {
        this._state = TileState.Empty;
    }
}