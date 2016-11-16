import {TileState} from './tile-state';

export interface TileView {
    getState() : TileState;
}