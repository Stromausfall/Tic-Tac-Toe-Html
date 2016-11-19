import * as Collections from 'typescript-collections';
import {ModelView} from './model-view';
import {ModelController} from './model-controller';
import {Tile} from './tile/tile';

export class Model implements ModelView, ModelController {
    _tiles:Collections.Dictionary<String, Tile> = null;

    private getTileKey(x:number, y:number) : string {
        return x + "/" + y;
    }

    initialize() : void {
        this._tiles = new Collections.Dictionary<String, Tile>();

        for (var x:number=0; x<3; x++) {
            for (var y:number=0; y<3; y++) {
                var key:string = this.getTileKey(x, y);
                var tile:Tile = new Tile(x, y);

                this._tiles.setValue(key, tile);
            }
        }
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
}

