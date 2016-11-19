import {TileController} from './tile/tile-controller';

export interface ModelController {
    getTile(x:number, y:number) : TileController;
    initialize() : void;
}