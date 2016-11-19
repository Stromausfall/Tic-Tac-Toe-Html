import {TileController} from './tile-controller';
import {TileView} from './tile-view';
import {TileState} from './tile-state';
import {Observable} from '../../utils/observable';

export class Tile extends Observable implements TileController, TileView {
    private _state:TileState;
    private _x:number;
    private _y:number;

    constructor(x:number, y:number) {
        super();

        this._x = x;
        this._y = y;
        this._state = TileState.Empty;
    }

    getX() : number {
        return this._x;
    }

    getY() : number {
        return this._y;
    }

    getState() : TileState {
        return this._state;
    }

    setState(tileState:TileState) : void {
        // if we wouldn't change to a new state...
        if (this._state == tileState) {
            return;
        }

        // only allow changes from TileState.Empty
        if (this._state != TileState.Empty) {
            return;
        }

        this._state = tileState;
        this.notify();
    }

    resetState() : void {
        this._state = TileState.Empty;
    }

    toString() {
        return this.getX() + "/" + this.getY();
    }
}