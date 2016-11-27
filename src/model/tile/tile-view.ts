import {TileState} from './tile-state';
import {ObservableElement} from '../../utils/observable-element';

export interface TileView extends ObservableElement {
    getState() : TileState;
}