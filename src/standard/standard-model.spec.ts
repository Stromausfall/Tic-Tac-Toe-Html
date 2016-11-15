import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as sinon from 'sinon';
import * as chai from 'chai';
import {Standard} from './standard';
import {Model} from '../model/model';
 
@suite class StandardModelSpec {

    @test "standard.getModel() value is assigned using the setter"() {
        var model:Model = <Model><any>{};
        var standard:Standard = new Standard();
        standard.setModel(model);

        chai.expect(standard.getModel()).equals(model)
     }
}
