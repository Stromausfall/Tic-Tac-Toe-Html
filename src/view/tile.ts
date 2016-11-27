import * as Phaser from 'phaser';
import {ImageConstants} from './image-constants';
import {TileController} from './tile-controller';
import {ControllerView} from '../controller/controller-view';
import {ModelView} from '../model/model-view';
import {TileView} from '../model/tile/tile-view';
import {TileState} from '../model/tile/tile-state';

export class Tile implements TileController {
    private _sprite:Phaser.Sprite;
    private _game:Phaser.Game;
    private _x:number;
    private _y:number;

    private constructor(game:Phaser.Game, sprite:Phaser.Sprite, x:number, y:number) {
        this._sprite = sprite;
        this._game = game;
        this._x = x;
        this._y = y;
    }

    private initialize(controller:ControllerView, model:ModelView) {
        // enable input 
        this._sprite.inputEnabled = true;

        // enable pixel perfect click detection
        this._sprite.input.pixelPerfectClick = true;

        // install a listener for click input events
        this._sprite.events.onInputDown.add(() => { controller.tileClicked(this._x, this._y); }, this);

        
        // get the model
        var tile:TileView = model.getTile(this._x, this._y);

        // install a listener on the tile model
        tile.addObserver(() => {

            // remove the sprite
            this._sprite.destroy(true);

            // create a new sprite
            this._sprite = Tile.createSprite(this._x, this._y, this._game, tile.getState())
        });
    }

    static create(game:Phaser.Game, controller:ControllerView, model:ModelView, x:number, y:number):Tile {
        var xPos = 200 + 100 * x;
        var yPos = 200 + 100 * y;

        var sprite:Phaser.Sprite = Tile.createSprite(x, y, game, TileState.Empty);
        var tile:Tile = new Tile(game, sprite, x, y);

        // initialize the tile
        tile.initialize(controller, model);

        return tile;
    }

    private static getImageConstant(tileState:TileState) : string {
        switch(tileState) {
            case TileState.Circle:
                return ImageConstants.TILE_CIRCLE;
            case TileState.Cross:
                return ImageConstants.TILE_CROSS;
            default:
                return ImageConstants.TILE_EMPTY;
        }
    }

    private static createSprite(x:number, y:number, game:Phaser.Game, tileState:TileState) : Phaser.Sprite {
        var xPos = 200 + 100 * x;
        var yPos = 200 + 100 * y;
        var imageConstant:string = Tile.getImageConstant(tileState)

        var sprite:Phaser.Sprite = game.add.sprite(xPos, yPos, imageConstant);
        
        // center
        sprite.anchor.setTo(0.5, 0.5);

        // disable input
        sprite.inputEnabled = false;

        return sprite;
    }
}
