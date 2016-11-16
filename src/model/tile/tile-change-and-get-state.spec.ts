import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as sinon from 'sinon';
import * as chai from 'chai';
import {Tile} from './tile';
import {TileState} from './tile-state';
 
@suite class TileChangeAndGetStateSpec {

    @test "the initial state is 'empty'"() {
        var tile:Tile = new Tile();

        chai.expect(tile.getState()).equals(TileState.Empty);
     }
     
    @test "allow change from 'empty' to 'circle'"() {
        var tile:Tile = new Tile();
        tile.setState(TileState.Circle);

        chai.expect(tile.getState()).equals(TileState.Circle);
     }
     
    @test "allow change from 'empty' to 'cross'"() {
        var tile:Tile = new Tile();
        tile.setState(TileState.Cross);

        chai.expect(tile.getState()).equals(TileState.Cross);
     }
     
    @test "don't allow change from 'cross' to 'circle'"() {
        var tile:Tile = new Tile();
        tile.setState(TileState.Cross);
        tile.setState(TileState.Circle);

        chai.expect(tile.getState()).equals(TileState.Cross);
     }
     
    @test "don't allow change from 'circle' to 'cross'"() {
        var tile:Tile = new Tile();
        tile.setState(TileState.Circle);
        tile.setState(TileState.Cross);

        chai.expect(tile.getState()).equals(TileState.Circle);
     }
     
    @test "don't allow change from 'cross' to 'empty'"() {
        var tile:Tile = new Tile();
        tile.setState(TileState.Cross);
        tile.setState(TileState.Empty);

        chai.expect(tile.getState()).equals(TileState.Cross);
     }
     
    @test "don't allow change from 'circle' to 'empty'"() {
        var tile:Tile = new Tile();
        tile.setState(TileState.Circle);
        tile.setState(TileState.Empty);

        chai.expect(tile.getState()).equals(TileState.Circle);
     }
     
    @test "reset allows to change from 'cross' to 'empty'"() {
        var tile:Tile = new Tile();
        tile.setState(TileState.Cross);
        tile.resetState();

        chai.expect(tile.getState()).equals(TileState.Empty);
     }
     
    @test "reset allows to change from 'circle' to 'empty'"() {
        var tile:Tile = new Tile();
        tile.setState(TileState.Circle);
        tile.resetState();

        chai.expect(tile.getState()).equals(TileState.Empty);
     }
     
    @test "reset allows to change from 'empty' to 'empty'"() {
        var tile:Tile = new Tile();
        tile.setState(TileState.Empty);
        tile.resetState();

        chai.expect(tile.getState()).equals(TileState.Empty);
     }
}
