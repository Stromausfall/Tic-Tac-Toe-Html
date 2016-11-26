import * as Collections from 'typescript-collections';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as sinon from 'sinon';
import * as chai from 'chai';
import {Model} from './model';
import {GameState} from './game-state';
import {TileState} from './tile/tile-state';

 
@suite class ModelGameStateSpec {
     @test "test that the initial GameStatus is ONGOING"() {
        var model:Model = new Model();
        model.initialize();

        chai.expect(model.getGameState()).equals(GameState.ONGOING);
     }

     @test "test that all horizontal wins are detected - and the observer is notified"() {
         for (var y=0; y<3; y++) {
            var model:Model = new Model();
            var gameStateChanged:boolean = false;
            model.initialize();
            model.addObserver(() => { gameStateChanged = true; })

            // click a whole row
            for (var x=0; x<3; x++) {
                chai.expect(gameStateChanged).equals(false);
                chai.expect(model.getGameState()).equals(GameState.ONGOING);

                model.getTile(x, y).setState(TileState.Circle);
            }

            chai.expect(gameStateChanged).equals(true);
            chai.expect(model.getGameState()).equals(GameState.WON_BY_CIRCLE);
         }
     }

     @test "test that all vertical wins are detected - and the observer is notified"() {
         for (var x=0; x<3; x++) {
            var model:Model = new Model();
            var gameStateChanged:boolean = false;
            model.initialize();
            model.addObserver(() => { gameStateChanged = true; })

            // click a whole row
            for (var y=0; y<3; y++) {
                chai.expect(gameStateChanged).equals(false);
                chai.expect(model.getGameState()).equals(GameState.ONGOING);
                
                model.getTile(x, y).setState(TileState.Circle);
            }

            chai.expect(gameStateChanged).equals(true);
            chai.expect(model.getGameState()).equals(GameState.WON_BY_CIRCLE);
         }
     }

     @test "test that all diagonal wins are detected - and the observer is notified"() {
         for (var reverse of [0,2]) {
            var model:Model = new Model();
            var gameStateChanged:boolean = false;
            model.initialize();
            model.addObserver(() => { gameStateChanged = true; })

            // click a whole row
            model.getTile(0, Math.abs(reverse - 0)).setState(TileState.Circle);
            model.getTile(1, Math.abs(reverse - 1)).setState(TileState.Circle);
            model.getTile(2, Math.abs(reverse - 2)).setState(TileState.Circle);

            chai.expect(gameStateChanged).equals(true);
            chai.expect(model.getGameState()).equals(GameState.WON_BY_CIRCLE);
         }
     }

     @test "test that it is detected if no one wins - and the observer is notified"() {
         for (var reverse of [0,2]) {
            var model:Model = new Model();
            var gameStateChanged:boolean = false;
            model.initialize();
            model.addObserver(() => { gameStateChanged = true; })

            // click a whole row
            model.getTile(0, 0).setState(TileState.Circle);
            model.getTile(1, 0).setState(TileState.Circle);
            model.getTile(2, 0).setState(TileState.Cross);
            model.getTile(0, 1).setState(TileState.Cross);
            model.getTile(1, 1).setState(TileState.Circle);
            model.getTile(2, 1).setState(TileState.Circle);
            model.getTile(0, 2).setState(TileState.Circle);
            model.getTile(1, 2).setState(TileState.Cross);
            
            chai.expect(model.getGameState()).equals(GameState.ONGOING);
            model.getTile(2, 2).setState(TileState.Cross);
            
            chai.expect(gameStateChanged).equals(true);
            chai.expect(model.getGameState()).equals(GameState.WON_BY_NOONE);
         }
     }
}
