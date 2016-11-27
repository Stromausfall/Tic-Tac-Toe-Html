import {ViewController} from './view-controller';
import {Tile} from './tile';
import {StandardView} from '../standard/standard-view';
import {ControllerView} from '../controller/controller-view';
import {ModelView} from '../model/model-view';
import {GameState} from '../model/game-state';

export class View implements ViewController {
    private _standard:StandardView;
    private _tiles:Array<Tile>;
    private _game:Phaser.Game;
    private _model:ModelView;
    private _gameStateText:Phaser.Text;

    constructor(standard:StandardView) {
        this._standard = standard;
    }

    initialize() : void {
        this._game = this._standard.getGame();
        var controller:ControllerView = this._standard.getController();
        this._model = this._standard.getModel();

        // set the color of the background
        this._game.stage.backgroundColor = "#FFFFFF";

        this._tiles = [];

        for (let x:number=0;x<3; x++) {
            for (let y:number=0;y<3; y++) {
                var tile:Tile = Tile.create(this._game, controller, this._model, x, y);
                this._tiles.push(tile);
            }
        }

        // watch the game state
        this._model.addObserver(() => { this.displayGameEndState(); });
    }

    private getGameStateString() : string {
        switch (this._model.getGameState()) {
            case GameState.WON_BY_CIRCLE:
                return "Circle Won !";
            case GameState.WON_BY_CROSS:
                return "Cross Won !";
            default:
                return "Draw";
        }
    }

    private displayGameEndState() : void {
        if (this._gameStateText != null) {
            this._gameStateText.destroy(true);
        }

        var text = this.getGameStateString();
        var style = { font: "65px Arial", fill: "#000000", align: "center" };
        this._gameStateText = this._game.add.text(100, 0, text, style);
    }
}
