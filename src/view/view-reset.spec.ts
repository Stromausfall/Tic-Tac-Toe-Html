/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../../node_modules/phaser/typescript/pixi.d.ts"/>

import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as Phaser from 'phaser';
import {View} from './view';
import {Standard} from '../standard/Standard'

@suite class StandardGameSpec {
    private createGameObjectFactoryStub() : Phaser.GameObjectFactory {
        return <Phaser.GameObjectFactory><any> {
            sprite(x: number, y: number, key?: any, frame?: any, group?: Phaser.Group): Phaser.Sprite { return null; }
        }
    }

    @test "view.initalize() creates sprites"() {
        // given
        var gameObjectFactoryStub:Phaser.GameObjectFactory =
            <Phaser.GameObjectFactory><any> {
                sprite(x: number, y: number, key?: any, frame?: any, group?: Phaser.Group): Phaser.Sprite { return null; }
            };
        var spriteSpy = sinon.spy(gameObjectFactoryStub, 'sprite');
        var standard:Standard = new Standard();
        standard.setGameObjectFactory(gameObjectFactoryStub);

        // when
        var view:View = new View(standard);
        view.initialize();

        // then
        var callCount:number = spriteSpy.callCount;
        chai.expect(callCount).is.equal(9);
     }
}
