import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as sinon from 'sinon';
import * as chai from 'chai';
import {Standard} from '../standard/standard';
import {Model} from '../model/model';
import {Controller} from './controller';
 
@suite class ControllerInitializeSpec {

    @test "the initialize method changes the state of all tiles to 'empty'"() {
        var model:Model = <Model><any>{}
        var standard:Standard = new Standard();
        standard.setModel(model);
        //var controller:Controller = new Controller(standard);

       // controller.

        //standard.setGame(game);
//DO ME
  //      chai.expect(standard.getGame()).equals(game)
     }
}
