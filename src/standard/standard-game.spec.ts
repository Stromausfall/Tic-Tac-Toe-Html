/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../../node_modules/phaser/typescript/pixi.d.ts"/>

import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as Phaser from 'phaser';
import {Standard} from './standard';

const sinonChai = require("sinon-chai");

chai.use(sinonChai);
 
@suite class StandardGameSpec {
    @test "standard.game assigned in the constructor is accessible"() {
        var game:Phaser.Game =  <Phaser.Game> <any> {};
        var standard:Standard = new Standard(game);

        chai.expect(standard.game).equals(game)
     }
}
