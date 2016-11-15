import {ViewController} from './view-controller';
import {Tile} from './tile';
import {StandardView} from '../standard/standard-view';

export class View implements ViewController {
    private _standard:StandardView;
    private _tiles:Array<Tile>;

    constructor(standard:StandardView) {
        this._standard = standard;
    }

    initialize() : void {
        var game:Phaser.Game = this._standard.getGame();

        // set the color of the background
        game.stage.backgroundColor = "#FFFFFF";


        this._tiles = [];

        for (let xIndex:number=0;xIndex<3; xIndex++) {
            for (let yIndex:number=0;yIndex<3; yIndex++) {
                let x:number = 200 + 100 * xIndex;
                var y:number = 200 + 100 * yIndex;

                var tile:Tile = Tile.create(game, x, y);
                this._tiles.push(tile);
            }
        }
    }
}
