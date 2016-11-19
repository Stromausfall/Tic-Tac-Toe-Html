import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as sinon from 'sinon';
import * as chai from 'chai';
import {Tile} from './tile';
import {TileState} from './tile-state';
 
@suite class TileChangeAndGetStateSpec {
    

    @test "the the coordinates of the tile"() {
        for (var x:number = 0; x < 3; x++) {
            for (var y:number = 0; y < 3; y++) {
                var tile:Tile = new Tile(x, y);

                chai.expect(tile.getX()).equals(x);
                chai.expect(tile.getY()).equals(y);
            }
        }
     }

    @test "the initial state is 'empty'"() {
        var tile:Tile = new Tile(1, 1);

        chai.expect(tile.getState()).equals(TileState.Empty);
     }
     
    @test "allow change from 'empty' to 'circle'"() {
        var tile:Tile = new Tile(1, 1);
        tile.setState(TileState.Circle);

        chai.expect(tile.getState()).equals(TileState.Circle);
     }
     
    @test "allow change from 'empty' to 'cross'"() {
        var tile:Tile = new Tile(1, 1);
        tile.setState(TileState.Cross);

        chai.expect(tile.getState()).equals(TileState.Cross);
     }
     
    @test "don't allow change from 'cross' to 'circle'"() {
        var tile:Tile = new Tile(1, 1);
        tile.setState(TileState.Cross);
        tile.setState(TileState.Circle);

        chai.expect(tile.getState()).equals(TileState.Cross);
     }
     
    @test "don't allow change from 'circle' to 'cross'"() {
        var tile:Tile = new Tile(1, 1);
        tile.setState(TileState.Circle);
        tile.setState(TileState.Cross);

        chai.expect(tile.getState()).equals(TileState.Circle);
     }
     
    @test "don't allow change from 'cross' to 'empty'"() {
        var tile:Tile = new Tile(1, 1);
        tile.setState(TileState.Cross);
        tile.setState(TileState.Empty);

        chai.expect(tile.getState()).equals(TileState.Cross);
     }
     
    @test "don't allow change from 'circle' to 'empty'"() {
        var tile:Tile = new Tile(1, 1);
        tile.setState(TileState.Circle);
        tile.setState(TileState.Empty);

        chai.expect(tile.getState()).equals(TileState.Circle);
     }
     
    @test "reset allows to change from 'cross' to 'empty'"() {
        var tile:Tile = new Tile(1, 1);
        tile.setState(TileState.Cross);
        tile.resetState();

        chai.expect(tile.getState()).equals(TileState.Empty);
     }
     
    @test "reset allows to change from 'circle' to 'empty'"() {
        var tile:Tile = new Tile(1, 1);
        tile.setState(TileState.Circle);
        tile.resetState();

        chai.expect(tile.getState()).equals(TileState.Empty);
     }
     
    @test "reset allows to change from 'empty' to 'empty'"() {
        var tile:Tile = new Tile(1, 1);
        tile.setState(TileState.Empty);
        tile.resetState();

        chai.expect(tile.getState()).equals(TileState.Empty);
     }
     
    @test "test that setting the state notifies observers"() {
        var tile:Tile = new Tile(1, 1);
        var notifyCounter:number = 0;
        tile.resetState();
        tile.addObserver(
            () => {
                notifyCounter++;
            }
        );
        
        tile.setState(TileState.Circle);

        chai.expect(notifyCounter).equals(1);
     }
     
    @test "test that if the state is not changed then the observers are not notified"() {
        var tile:Tile = new Tile(1, 1);
        var notifyCounter:number = 0;
        tile.resetState();
        tile.addObserver(
            () => {
                notifyCounter++;
            }
        );
        
        tile.setState(TileState.Empty);

        chai.expect(notifyCounter).equals(0);
     }

     @test "test the toString() method"() {
         for (var x:number=0; x<3; x++) {
             for (var y:number=0; y<3; y++) {
                 var tile:Tile = new Tile(x, y);

                 chai.expect(tile.toString()).equals(x+"/"+y);
             }
         }
     }
}
