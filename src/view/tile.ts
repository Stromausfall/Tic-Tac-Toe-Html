import * as Phaser from 'phaser';
import {ImageConstants} from './image-constants';
import {TileController} from './tile-controller';

export class Tile implements TileController {
    _sprite:Phaser.Sprite;

    private constructor(sprite:Phaser.Sprite) {
        this._sprite = sprite;
    }

    private initialize() {       
        // enable input 
        this._sprite.inputEnabled = true;

        // enable pixel perfect click detection
        this._sprite.input.pixelPerfectClick = true;

        // install a listener for click input events
        this._sprite.events.onInputDown.add(() => { this.listener2(); }, this);

        this._sprite.anchor.setTo(0.5, 0.5);
        
    }

    private listener2() {
        console.debug("just clicked2! " + this._sprite.x + " - " + this._sprite.y);
    }

    static create(game:Phaser.Game, x:number, y:number):Tile {
        var sprite:Phaser.Sprite = game.add.sprite(x, y, ImageConstants.TILE_EMPTY);
        var tile:Tile = new Tile(sprite);

        // initialize the tile
        tile.initialize();

        return tile;
    }
}
