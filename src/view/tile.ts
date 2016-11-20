import * as Phaser from 'phaser';
import {ImageConstants} from './image-constants';
import {TileController} from './tile-controller';
import {ControllerView} from '../controller/controller-view';

export class Tile implements TileController {
    private _sprite:Phaser.Sprite;
    private _x:number;
    private _y:number;

    private constructor(sprite:Phaser.Sprite, x:number, y:number) {
        this._sprite = sprite;
        this._x = x;
        this._y = y;
    }

    private initialize(controller:ControllerView) {       
        // enable input 
        this._sprite.inputEnabled = true;

        // enable pixel perfect click detection
        this._sprite.input.pixelPerfectClick = true;

        // install a listener for click input events
        this._sprite.events.onInputDown.add(() => { controller.tileClicked(this._x, this._y); }, this);

        this._sprite.anchor.setTo(0.5, 0.5);        
    }

    private listener2() {
        console.debug("just clicked2! " + this._sprite.x + " - " + this._sprite.y);
    }

    static create(game:Phaser.Game, controller:ControllerView, x:number, y:number):Tile {
        var xPos = 200 + 100 * x;
        var yPos = 200 + 100 * y;

        var sprite:Phaser.Sprite = game.add.sprite(xPos, yPos, ImageConstants.TILE_EMPTY);
        var tile:Tile = new Tile(sprite, x, y);

        // initialize the tile
        tile.initialize(controller);

        return tile;
    }
}
