import {ViewController} from './view-controller';
import {StandardView} from '../standard/standard-view';

export class View implements ViewController {
    private _standard:StandardView;

    constructor(standard:StandardView) {
        this._standard = standard;
    }

    initialize() : void {

    }
}
