import {ModelController} from '../model/model-controller';
import {ViewController} from '../view/view-controller';

export interface StandardController {
    getModel() : ModelController;
    getView() : ViewController;
}