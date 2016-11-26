import * as Collections from 'typescript-collections';
import {ModelView} from './model-view';
import {ModelController} from './model-controller';
import {Tile} from './tile/tile';
import {GameState} from './game-state';
import {TileState} from './tile/tile-state';
import {Observable} from '../utils/observable';

export class Model extends Observable implements ModelView, ModelController {
    private _tiles:Collections.Dictionary<String, Tile> = null;
    private _gameState:GameState = GameState.ONGOING;

    private getTileKey(x:number, y:number) : string {
        return x + "/" + y;
    }

    initialize() : void {
        this._tiles = new Collections.Dictionary<String, Tile>();

        // create tiles
        for (var x:number=0; x<3; x++) {
            for (var y:number=0; y<3; y++) {
                var key:string = this.getTileKey(x, y);
                var tile:Tile = new Tile(x, y);

                // if the state of a tile changes - check the game state
                tile.addObserver(() => { this.checkGameState() });

                this._tiles.setValue(key, tile);
            }
        }
    }

    private checkForWin(tile1:Tile, tile2:Tile, tile3:Tile) {
        if ((tile1.getState() == tile2.getState()) && (tile2.getState() == tile3.getState())) {
            if (tile1.getState() == TileState.Circle) {
                this._gameState = GameState.WON_BY_CIRCLE;
                this.notify();
            }

            if (tile1.getState() == TileState.Cross) {
                this._gameState = GameState.WON_BY_CROSS;
                this.notify();
            }
        }
    }

    private checkHorizontal():void {
        for (var y=0; y<3; y++) {
            var tile1:Tile = this.getTile(0, y);
            var tile2:Tile = this.getTile(1, y);
            var tile3:Tile = this.getTile(2, y);

            this.checkForWin(tile1, tile2, tile3);
        }
    }

    private checkVertical():void {
        for (var x=0; x<3; x++) {
            var tile1:Tile = this.getTile(x, 0);
            var tile2:Tile = this.getTile(x, 1);
            var tile3:Tile = this.getTile(x, 2);

            this.checkForWin(tile1, tile2, tile3);
        }
    }

    private checkDiagonal1():void {
        var tile1:Tile = this.getTile(0, 0);
        var tile2:Tile = this.getTile(1, 1);
        var tile3:Tile = this.getTile(2, 2);

        this.checkForWin(tile1, tile2, tile3);
    }

    private checkDiagonal2():void {
        var tile1:Tile = this.getTile(2, 0);
        var tile2:Tile = this.getTile(1, 1);
        var tile3:Tile = this.getTile(0, 2);

        this.checkForWin(tile1, tile2, tile3);
    }

    private checkForNoWin():void {
        // can only happen if the game is still ongoing
        if (this._gameState == GameState.ONGOING) {
            var allAreOwned:boolean = true;

            // every tile should be clicked by now
            for (var x=0;x<3;x++) {
                for (var y=0;y<3;y++) {
                    var owned:boolean = (this.getTile(x, y).getState() != TileState.Empty);

                    allAreOwned = allAreOwned && owned;
                }
            }

            if (allAreOwned) {
                this._gameState = GameState.WON_BY_NOONE;
                this.notify();
            }
        }
    }

    private checkGameState() {
        // check horizontal tiles for a win
        this.checkHorizontal();
        
        // check vertical tiles for a win
        this.checkVertical();

        // check diagonal tiles for a win
        this.checkDiagonal1();
        this.checkDiagonal2();

        // no one won but game is still over
        this.checkForNoWin();
    }

    getTile(x:number, y:number) : Tile {
        // if not yet initialized
        if (this._tiles == null) {
            return null;
        }

        var key:string = this.getTileKey(x, y);
        var tile:Tile = this._tiles.getValue(key);
        
        return tile;
    }
    
    getGameState() : GameState {
        return this._gameState
    }
}

