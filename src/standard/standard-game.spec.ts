/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../../node_modules/phaser/typescript/pixi.d.ts"/>

import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as Phaser from 'phaser';
import {Standard} from './standard';
 
@suite class StandardGameSpec {

    @test "standard.getGame() value is assigned using the setter"() {
        var game:Phaser.Game = <Phaser.Game><any>{};
        var standard:Standard = new Standard();
        standard.setGame(game);

        chai.expect(standard.getGame()).equals(game)
     }
}
