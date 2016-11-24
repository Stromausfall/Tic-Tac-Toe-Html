import * as Collections from 'typescript-collections';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as sinon from 'sinon';
import * as chai from 'chai';
import {Model} from './model';
import {GameState} from './game-state';

 
@suite class ModelGameStateSpec {
     @test "test that the initial GameStatus is ONGOING"() {
        var model:Model = new Model();
        model.initialize();

        chai.expect(model.getGameState()).equals(GameState.ONGOING);
     }
}
