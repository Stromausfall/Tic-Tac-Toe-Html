import * as Collections from 'typescript-collections';
import {ControllerView} from './controller-view';
import {StandardController} from '../standard/standard-controller';
import {ModelController} from '../model/model-controller';
import {ViewController} from '../view/view-controller';
import {TileController} from '../model/tile/tile-controller';
import {TileState} from '../model/tile/tile-state';
import {Player} from '../controller/player/player';
import {GameState} from '../model/game-state';

export class Controller implements ControllerView {
    private _standard:StandardController;
    private _players:Collections.Queue<Player>;

    constructor(standard:StandardController) {
        this._standard = standard;
        this._players = new Collections.Queue<Player>();
    }

    private getModel() : ModelController {
        return this._standard.getModel();
    }

    private getView() : ViewController {
        return this._standard.getView();
    }

    tileClicked(x:number, y:number):void {
        // only if the game is still ongoing
        if (this.getModel().getGameState() == GameState.ONGOING) {
            var currentPlayer:Player = this._players.peek();

            currentPlayer.tileClicked(x, y);

            this.checkAndStartNextTurn();
        }
    }

    initialize() : void {
        this.getModel().initialize();
        this.getView().initialize();
    }

    startTurnOfCurrentPlayer() : void {
        // only if the game is still ongoing
        if (this.getModel().getGameState() == GameState.ONGOING) {
            var currentPlayer:Player = this._players.peek();

            // start the turn of the player
            currentPlayer.startTurn();

            // check if the turn already finished (if so start the turn of the next player)
            this.checkAndStartNextTurn();
        }
    }

    private checkAndStartNextTurn() : void {
        var currentPlayer:Player = this._players.peek();

        if (currentPlayer.isTurnFinished()) {
            // change the current player
            this._players.dequeue();
            this._players.enqueue(currentPlayer);

            // start the turn of the next player
            this.startTurnOfCurrentPlayer();
        }
    }

    setPlayers(playerOne:Player, playerTwo:Player) : void {
        this._players.add(playerOne);
        this._players.add(playerTwo);
    }
}