import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as sinon from 'sinon';
import * as chai from 'chai';
import {Standard} from '../standard/standard';
 
@suite class ControllerTileClickedSpec {

    @test "the tileClicked method changes the state of the corresponding entity"() {
        var standard:Standard = new Standard();
        //standard.setGame(game);
//DO ME
  //      chai.expect(standard.getGame()).equals(game)
     }
}
