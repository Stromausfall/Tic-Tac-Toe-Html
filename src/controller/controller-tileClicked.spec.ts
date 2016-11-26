import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as sinon from 'sinon';
import * as chai from 'chai';
import {Standard} from '../standard/standard';
import {TileState} from '../model/tile/tile-state';
import {TileController} from '../model/tile/tile-controller';
import {Model} from '../model/model';
import {View} from '../view/view';
import {Controller} from './controller';
import {Player} from './player/player';
 
@suite class ControllerTileClickedSpec {

    private createPlayer(turnFinished:boolean, model:Model):Player {
        return <Player><any>{
            tileClicked(x:number, y:number):void {
                model.getTile(x, y).setState(TileState.Circle);
            },
            isTurnFinished():boolean { return turnFinished; },
            startTurn():void {}
        }
    }

    @test "the tileClicked method changes the state of the corresponding entity"() {
        var view:View = <View><any>{
            initialize() : void {}
        }        
        var model:Model = new Model();
        var standard:Standard = new Standard();
        standard.setModel(model);
        standard.setView(view);
        var controller:Controller = new Controller(standard);
        controller.setPlayers(this.createPlayer(false, model), this.createPlayer(false, model));

        controller.initialize();
        var tile:TileController = model.getTile(2, 1);

        // expect the tile to be in TileState.empty at first
        chai.expect(tile.getState()).equals(TileState.Empty)

        // click
        controller.tileClicked(2, 1)

        // expect the tile to be changed now
        chai.expect(tile.getState()).not.equals(TileState.Empty)
     }

    @test "after the game is won - players can't interact anymore with the game"() {
        var view:View = <View><any>{
            initialize() : void {}
        }        
        var model:Model = new Model();
        var standard:Standard = new Standard();
        standard.setModel(model);
        standard.setView(view);
        var controller:Controller = new Controller(standard);
        var player1:Player = this.createPlayer(false, model)
        var player2:Player = this.createPlayer(false, model)
        
        var playerOneStartTurnSpy = sinon.spy(player1, 'startTurn');
        var playerTwoStartTurnSpy = sinon.spy(player2, 'startTurn');
        var playerOneTurnFinishedSpy = sinon.spy(player1, 'isTurnFinished');
        var playerTwoTurnFinishedSpy = sinon.spy(player2, 'isTurnFinished');
        var playerOneTileClickedSpy = sinon.spy(player1, 'tileClicked');
        var playerTwoTileClickedSpy = sinon.spy(player2, 'tileClicked');        
        controller.setPlayers(player1, player2);

        // start the game
        controller.initialize();
        controller.startTurnOfCurrentPlayer();

        // win the game
        model.getTile(0, 0).setState(TileState.Circle);
        model.getTile(1, 1).setState(TileState.Circle);
        model.getTile(2, 2).setState(TileState.Circle);

        // no more interaction should happen
        chai.expect(playerOneStartTurnSpy.callCount).equals(1);
        chai.expect(playerTwoStartTurnSpy.callCount).equals(0);
        chai.expect(playerOneTurnFinishedSpy.callCount).equals(1);
        chai.expect(playerTwoTurnFinishedSpy.callCount).equals(0);
        chai.expect(playerOneTileClickedSpy.callCount).equals(0);
        chai.expect(playerTwoTileClickedSpy.callCount).equals(0);

        // click a tile
        controller.tileClicked(2, 2);        

        // no more interaction should happen
        chai.expect(playerOneStartTurnSpy.callCount).equals(1);
        chai.expect(playerTwoStartTurnSpy.callCount).equals(0);
        chai.expect(playerOneTurnFinishedSpy.callCount).equals(1);
        chai.expect(playerTwoTurnFinishedSpy.callCount).equals(0);
        chai.expect(playerOneTileClickedSpy.callCount).equals(0);
        chai.expect(playerTwoTileClickedSpy.callCount).equals(0);
     }

    @test "after the game is won - players can't interact anymore with the game 2"() {
        var view:View = <View><any>{
            initialize() : void {}
        }        
        var model:Model = new Model();
        var standard:Standard = new Standard();
        standard.setModel(model);
        standard.setView(view);
        var controller:Controller = new Controller(standard);
        var player1:Player = this.createPlayer(false, model)
        var player2:Player = this.createPlayer(false, model)
        
        var playerOneStartTurnSpy = sinon.spy(player1, 'startTurn');
        var playerTwoStartTurnSpy = sinon.spy(player2, 'startTurn');
        var playerOneTurnFinishedSpy = sinon.spy(player1, 'isTurnFinished');
        var playerTwoTurnFinishedSpy = sinon.spy(player2, 'isTurnFinished');
        var playerOneTileClickedSpy = sinon.spy(player1, 'tileClicked');
        var playerTwoTileClickedSpy = sinon.spy(player2, 'tileClicked');        
        controller.setPlayers(player1, player2);

        // start the game
        controller.initialize();
        controller.startTurnOfCurrentPlayer();

        // win the game
        model.getTile(0, 0).setState(TileState.Circle);
        model.getTile(1, 1).setState(TileState.Circle);
        model.getTile(2, 2).setState(TileState.Circle);

        // no more interaction should happen
        chai.expect(playerOneStartTurnSpy.callCount).equals(1);
        chai.expect(playerTwoStartTurnSpy.callCount).equals(0);
        chai.expect(playerOneTurnFinishedSpy.callCount).equals(1);
        chai.expect(playerTwoTurnFinishedSpy.callCount).equals(0);
        chai.expect(playerOneTileClickedSpy.callCount).equals(0);
        chai.expect(playerTwoTileClickedSpy.callCount).equals(0);

        // click a tile
        controller.startTurnOfCurrentPlayer();       

        // no more interaction should happen
        chai.expect(playerOneStartTurnSpy.callCount).equals(1);
        chai.expect(playerTwoStartTurnSpy.callCount).equals(0);
        chai.expect(playerOneTurnFinishedSpy.callCount).equals(1);
        chai.expect(playerTwoTurnFinishedSpy.callCount).equals(0);
        chai.expect(playerOneTileClickedSpy.callCount).equals(0);
        chai.expect(playerTwoTileClickedSpy.callCount).equals(0);
     }
}
