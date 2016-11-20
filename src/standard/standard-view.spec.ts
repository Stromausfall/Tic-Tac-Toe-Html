import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as sinon from 'sinon';
import * as chai from 'chai';
import {Standard} from './standard';
import {View} from '../view/view';
 
@suite class StandardViewSpec {

    @test "standard.getView() value is assigned using the setter"() {
        var view:View = <View><any>{};
        var standard:Standard = new Standard();
        standard.setView(view);

        chai.expect(standard.getView()).equals(view)
     }
}
