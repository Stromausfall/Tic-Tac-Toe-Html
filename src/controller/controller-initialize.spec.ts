import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as sinon from 'sinon';
import * as chai from 'chai';
import {Standard} from '../standard/standard';
import {Model} from '../model/model';
import {Controller} from './controller';
import {TileController} from '../model/tile/tile-controller';
import {TileState} from '../model/tile/tile-state';
 
@suite class ControllerInitializeSpec {

    @test "the initialize method changes the state of all tiles to 'empty'"() {
        var model:Model = new Model();
        var standard:Standard = new Standard();
        standard.setModel(model);
        var controller:Controller = new Controller(standard);

        controller.initialize();

        for (var x:number=0; x<3; x++) {
            for (var y:number=0; y<3; y++) {
                var tile:TileController = model.getTile(x, y);

                chai.expect(tile.getState()).equals(TileState.Empty);
            }
        }
     }
}
