import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as sinon from 'sinon';
import * as chai from 'chai';
import {Standard} from '../standard/standard';
import {Model} from '../model/model';
import {View} from '../view/view';
import {Controller} from './controller';
import {TileController} from '../model/tile/tile-controller';
import {TileState} from '../model/tile/tile-state';
 
@suite class ControllerInitializeSpec {

    @test "the initialize method changes the state of all tiles to 'empty'"() {
        var view:View = <View><any>{
            initialize() : void {}
        }
        var model:Model = new Model();
        var standard:Standard = new Standard();
        standard.setModel(model);
        standard.setView(view);
        var controller:Controller = new Controller(standard);

        controller.initialize();

        for (var x:number=0; x<3; x++) {
            for (var y:number=0; y<3; y++) {
                var tile:TileController = model.getTile(x, y);

                chai.expect(tile.getState()).equals(TileState.Empty);
            }
        }
     }

    @test "the initialize method calls the initialize method of the view"() {
        // set up an environemnt with a view which has a spy on the initialize method
        var view:View = <View><any>{
            initialize() : void {}
        }        
        var intializeSpy = sinon.spy(view, 'initialize');
        var model:Model = <Model><any>{
            initialize() : void {}
        }
        var standard:Standard = new Standard();
        standard.setModel(model);
        standard.setView(view);
        var controller:Controller = new Controller(standard);

        // trigger the initialization
        controller.initialize();

        // we expect the initialize method of the view instance to be called exactly once
        chai.expect(intializeSpy.callCount).equals(1);
     }
}
