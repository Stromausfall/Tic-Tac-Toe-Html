import {TileController} from './tile/tile-controller';
import {GameState} from './game-state';

export interface ModelController {
    getTile(x:number, y:number) : TileController;
    initialize() : void;
    getGameState();
}
