import * as Collections from 'typescript-collections';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as sinon from 'sinon';
import * as chai from 'chai';
import {Model} from './model';
import {Tile} from './tile/tile';

 
@suite class ControllerInitializeSpec {

    private getAllTiles(model:Model):Collections.Set<Tile> {
        var tiles:Collections.Set<Tile> = new Collections.Set<Tile>();

        for (var x:number = 0; x<3; x++) {
            for (var y:number = 0; y<3; y++) {
                var tile:Tile = model.getTile(x, y);
                
                if (tile != null) {
                    tiles.add(tile);
                }
            }
        }

        return tiles;
    }

    @test "the initialize method creates tiles"() {
        var tiles:Collections.Set<Tile> = null;
        var model:Model = new Model();

        // without initializing - no tile should be returned
        tiles = this.getAllTiles(model);
        chai.expect(tiles.size()).equals(0);

        model.initialize();

        // after initializing - 9 tiles should be returned
        tiles = this.getAllTiles(model);
        chai.expect(tiles.size()).equals(9);
     }

     @test "test that the getTile(x,y) method returns the same tile"() {
        var model:Model = new Model();
        model.initialize();

        var tile1:Tile = model.getTile(2, 0);
        var tile2:Tile = model.getTile(2, 0);

        chai.expect(tile1 == tile2).equals(true);
     }

     @test "test that calling the initialize method again results in new tiles"() {
        var model:Model = new Model();
        model.initialize();

        var tile1:Tile = model.getTile(2, 0);
        
        model.initialize();
        
        var tile2:Tile = model.getTile(2, 0);

        chai.expect(tile1 != tile2).equals(true);
     }
}
