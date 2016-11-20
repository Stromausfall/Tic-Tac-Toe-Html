import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as Phaser from 'phaser';
import {Standard} from './standard';
import {Controller} from '../controller/controller';
 
@suite class StandardGameSpec {

    @test "standard.getController() value is assigned using the setter"() {
        var controller:Controller = <Controller><any>{};
        var standard:Standard = new Standard();
        standard.setController(controller);

        chai.expect(standard.getController()).equals(controller);
     }
}
