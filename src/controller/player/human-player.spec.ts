import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as sinon from 'sinon';
import * as chai from 'chai';
import {Player} from './player';
import {HumanPlayer} from './human-player';
import {Tile} from '../../model/tile/tile';
import {TileState} from '../../model/tile/tile-state';
import {ModelController} from '../../model/model-controller';
 
@suite class HumanPlayerSpec {

    @test "the tile clickedMethod changes the state of the tile and ends the turn"() {
        // given the HumanPlayer
        var tile:Tile = new Tile(1, 2);
        var model:ModelController = <ModelController><any>{
            getTile(x:number, y:number) : Tile {
                if ((x == 1) && (y == 2)) {
                    return tile;
                }

                return null;
            }
        }
        var player:Player = new HumanPlayer(model, TileState.Circle);

        // start the turn of the player
        player.startTurn();
        chai.expect(player.isTurnFinished()).equals(false);

        // click a tile
        player.tileClicked(1, 2);

        // expect the tile to be changed and the turn being over
        chai.expect(tile.getState()).equals(TileState.Circle);
        chai.expect(player.isTurnFinished()).equals(true);
     }

    @test "the tile clickedMethod changes the state of the tile and ends the turn - only if the tile is not already owned"() {
        // given the HumanPlayer
        var tile:Tile = new Tile(2, 2);
        tile.setState(TileState.Cross);
        var model:ModelController = <ModelController><any>{
            getTile(x:number, y:number) : Tile {
                if ((x == 2) && (y == 2)) {
                    return tile;
                }

                return null;
            }
        }
        var player:Player = new HumanPlayer(model, TileState.Circle);

        // start the turn of the player
        player.startTurn();
        chai.expect(player.isTurnFinished()).equals(false);

        // click a tile
        player.tileClicked(2, 2);

        // expect nothing to have changed - because the tile was already owned
        chai.expect(tile.getState()).equals(TileState.Cross);
        chai.expect(player.isTurnFinished()).equals(false);
     }

    @test "the tile startTurn method allows to click another tile in the next turn"() {
        // given the HumanPlayer
        var tile1:Tile = new Tile(1, 1);
        var tile2:Tile = new Tile(2, 2);
        var model:ModelController = <ModelController><any>{
            getTile(x:number, y:number) : Tile {
                if ((x == 2) && (y == 2)) {
                    return tile2;
                }
                if ((x == 1) && (y == 1)) {
                    return tile1;
                }

                return null;
            }
        }
        var player:Player = new HumanPlayer(model, TileState.Circle);

        // start the turn of the player
        player.startTurn();
        player.tileClicked(2, 2);
        chai.expect(player.isTurnFinished()).equals(true);

        // start the next turn of the player
        player.startTurn();
        chai.expect(player.isTurnFinished()).equals(false);
        player.tileClicked(1, 1);

        chai.expect(tile1.getState()).equals(TileState.Circle);
        chai.expect(tile2.getState()).equals(TileState.Circle);
        chai.expect(player.isTurnFinished()).equals(true);
     }
}
