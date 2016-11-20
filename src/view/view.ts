import {ViewController} from './view-controller';
import {Tile} from './tile';
import {StandardView} from '../standard/standard-view';
import {ControllerView} from '../controller/controller-view';

export class View implements ViewController {
    private _standard:StandardView;
    private _tiles:Array<Tile>;

    constructor(standard:StandardView) {
        this._standard = standard;
    }

    initialize() : void {
        var game:Phaser.Game = this._standard.getGame();
        var controller:ControllerView = this._standard.getController();

        // set the color of the background
        game.stage.backgroundColor = "#FFFFFF";

        this._tiles = [];

        for (let x:number=0;x<3; x++) {
            for (let y:number=0;y<3; y++) {
                var tile:Tile = Tile.create(game, controller, x, y);
                this._tiles.push(tile);
            }
        }
    }
}
