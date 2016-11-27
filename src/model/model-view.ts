import {GameState} from './game-state';
import {TileView} from './tile/tile-view';
import {ObservableElement} from '../utils/observable-element';

export interface ModelView extends ObservableElement {
    getGameState() : GameState;
    getTile(x:number, y:number) : TileView;
}