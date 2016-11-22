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
}
