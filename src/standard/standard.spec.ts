/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../../node_modules/phaser/typescript/pixi.d.ts"/>

import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as Phaser from 'phaser';
import {Standard} from './standard';
import {View} from '../view/view';
import {Model} from '../model/model';
import {Controller} from '../controller/controller';
 
@suite class StandardViewSpec {

    @test "standard.getView() value is assigned using the setter"() {
        var view:View = <View><any>{};
        var standard:Standard = new Standard();
        standard.setView(view);

        chai.expect(standard.getView()).equals(view)
    }
     
    @test "standard.getController() value is assigned using the setter"() {
        var controller:Controller = <Controller><any>{};
        var standard:Standard = new Standard();
        standard.setController(controller);

        chai.expect(standard.getController()).equals(controller);
    }   
    
    @test "standard.getGame() value is assigned using the setter"() {
        var game:Phaser.Game = <Phaser.Game><any>{};
        var standard:Standard = new Standard();
        standard.setGame(game);

        chai.expect(standard.getGame()).equals(game)
    }  
    
    @test "standard.getModel() value is assigned using the setter"() {
        var model:Model = <Model><any>{};
        var standard:Standard = new Standard();
        standard.setModel(model);

        chai.expect(standard.getModel()).equals(model)
    }
}
