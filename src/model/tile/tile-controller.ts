import {TileState} from './tile-state';

export interface TileController {
    setState(tileState:TileState) : void;
    getState() : TileState;
}