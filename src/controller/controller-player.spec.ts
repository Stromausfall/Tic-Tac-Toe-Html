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
 
@suite class ControllerPlayerSpec {

    private createPlayer(turnFinished:boolean):Player {
        return <Player><any>{
            tileClicked(x:number, y:number):void {},
            isTurnFinished():boolean { return turnFinished; },
            startTurn():void {}
        }
    }

    @test "the startTurn method starts the turn of the first player"() {
        var view:View = <View><any>{
            initialize() : void {}
        }        
        var model:Model = new Model();
        var standard:Standard = new Standard();
        standard.setModel(model);
        standard.setView(view);
        var controller:Controller = new Controller(standard);
        var playerOne:Player = this.createPlayer(false);
        var playerTwo:Player = this.createPlayer(false);
        var playerOneStartTurnSpy = sinon.spy(playerOne, 'startTurn');
        var playerTwoStartTurnSpy = sinon.spy(playerTwo, 'startTurn');

        controller.setPlayers(playerOne, playerTwo);

        // expect that no startTurn method has been called of any player until now
        chai.expect(playerOneStartTurnSpy.callCount).equals(0);
        chai.expect(playerTwoStartTurnSpy.callCount).equals(0);

        controller.startTurnOfCurrentPlayer();

        // expect that the player one turn has started
        chai.expect(playerOneStartTurnSpy.callCount).equals(1);
        chai.expect(playerTwoStartTurnSpy.callCount).equals(0);
     }

    @test "the startTurn method is followed by a call to the isTurnFinished method"() {
        var view:View = <View><any>{
            initialize() : void {}
        }        
        var model:Model = new Model();
        var standard:Standard = new Standard();
        standard.setModel(model);
        standard.setView(view);
        var controller:Controller = new Controller(standard);
        var playerOne:Player = this.createPlayer(false);
        var playerTwo:Player = this.createPlayer(false);
        var playerOneStartTurnSpy = sinon.spy(playerOne, 'startTurn');
        var playerOneFinishedTurnSpy = sinon.spy(playerOne, 'isTurnFinished');
        controller.setPlayers(playerOne, playerTwo);

        controller.startTurnOfCurrentPlayer();

        chai.expect(playerOneStartTurnSpy.callCount).equals(1);
        chai.expect(playerOneFinishedTurnSpy.callCount).equals(1);
     }

    @test "the startTurn method is followed by a call to the isTurnFinished method - which when true starts the turn of the next player"() {
        var view:View = <View><any>{
            initialize() : void {}
        }        
        var model:Model = new Model();
        var standard:Standard = new Standard();
        standard.setModel(model);
        standard.setView(view);
        var controller:Controller = new Controller(standard);
        var playerOne:Player = this.createPlayer(true);
        var playerTwo:Player = this.createPlayer(false);
        var playerOneStartTurnSpy = sinon.spy(playerOne, 'startTurn');
        var playerOneFinishedTurnSpy = sinon.spy(playerOne, 'isTurnFinished');
        var playerTwoStartTurnSpy = sinon.spy(playerTwo, 'startTurn');
        var playerTwoFinishedTurnSpy = sinon.spy(playerTwo, 'isTurnFinished');
        controller.setPlayers(playerOne, playerTwo);
        
        controller.startTurnOfCurrentPlayer();

        chai.expect(playerOneStartTurnSpy.callCount).equals(1);
        chai.expect(playerOneFinishedTurnSpy.callCount).equals(1);
        chai.expect(playerTwoStartTurnSpy.callCount).equals(1);
        chai.expect(playerTwoFinishedTurnSpy.callCount).equals(1);
    }

    @test "if after the startTurn - the isTurnFinished method returns false, then a call to the isClickedMethod CAN result in the next player starting its turn"() {
        var view:View = <View><any>{
            initialize() : void {}
        }        
        var model:Model = new Model();
        var standard:Standard = new Standard();
        standard.setModel(model);
        standard.setView(view);
        var controller:Controller = new Controller(standard);
        var turnFinished:boolean = false;
        var playerOne:Player = <Player><any>{
            tileClicked(x:number, y:number):void {},
            isTurnFinished():boolean { return turnFinished; },
            startTurn():void {}
        }
        var playerTwo:Player = this.createPlayer(false);
        var playerOneStartTurnSpy = sinon.spy(playerOne, 'startTurn');
        var playerOneFinishedTurnSpy = sinon.spy(playerOne, 'isTurnFinished');
        var playerTwoStartTurnSpy = sinon.spy(playerTwo, 'startTurn');
        var playerTwoFinishedTurnSpy = sinon.spy(playerTwo, 'isTurnFinished');
        controller.setPlayers(playerOne, playerTwo);
        
        // start turn
        controller.startTurnOfCurrentPlayer();

        chai.expect(playerOneStartTurnSpy.callCount).equals(1);
        chai.expect(playerOneFinishedTurnSpy.callCount).equals(1);
        chai.expect(playerTwoStartTurnSpy.callCount).equals(0);

        // wrong tile clicked
        turnFinished = false;
        controller.tileClicked(0, 0);

        chai.expect(playerOneStartTurnSpy.callCount).equals(1);
        chai.expect(playerOneFinishedTurnSpy.callCount).equals(2);
        chai.expect(playerTwoStartTurnSpy.callCount).equals(0);

        // correct tile clicked
        turnFinished = true;
        controller.tileClicked(1, 1);

        chai.expect(playerOneStartTurnSpy.callCount).equals(1);
        chai.expect(playerOneFinishedTurnSpy.callCount).equals(3);
        chai.expect(playerTwoStartTurnSpy.callCount).equals(1);
        chai.expect(playerTwoFinishedTurnSpy.callCount).equals(1);
    }
}
