/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../../node_modules/phaser/typescript/pixi.d.ts"/>

import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as Phaser from 'phaser';
import {Standard} from './standard';
 
@suite class StandardGameObjectFactorySpec {
    @test "standard.getGameObjectFactory() value is assigned using the setter"() {
        var gameObjectFactory:Phaser.GameObjectFactory =  <Phaser.GameObjectFactory> <any> {};
        var standard:Standard = new Standard();
        standard.setGameObjectFactory(gameObjectFactory)

        chai.expect(standard.getGameObjectFactory()).equals(gameObjectFactory)
     }
}
