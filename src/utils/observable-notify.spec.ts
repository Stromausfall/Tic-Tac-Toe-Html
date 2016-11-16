import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as sinon from 'sinon';
import * as chai from 'chai';;
import {Observable} from './observable';
 
@suite class ObservableNotifySpec {

    @test "the notify method notifies an observer"() {
        var called:number = 0;
        var listener = { 
            myFunction():void {
                called++;
            }
         }
        var observable:Observable = new Observable();
        observable.addObserver("dummyKey", listener.myFunction);

        // initally the method hasn't been called
        chai.expect(called).equals(0);

        observable.notify();

        // after calling the notify method we expect the method to be called exactly once
        chai.expect(called).equals(1);
     }
}
