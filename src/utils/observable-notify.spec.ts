import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as sinon from 'sinon';
import * as chai from 'chai';
import {Observable} from './observable';
 
class TestClass {
    called:number = 0;
    
    myFunction():void {
        this.called++;
    }
}

@suite class ObservableNotifySpec {

    @test "the notify method notifies an observer"() {
        var called:number = 0;
        var listener = { 
            myFunction():void {
                called++;
            }
         }
        var observable:Observable = new Observable();
        observable.addObserver(listener.myFunction);

        // initally the method hasn't been called
        chai.expect(called).equals(0);

        observable.notify();

        // after calling the notify method we expect the method to be called exactly once
        chai.expect(called).equals(1);
     }
     
    @test "test removing an observer"() {
        var called:number = 0;
        var listener = { 
            myFunction():void {
                called++;
            }
         }
        var observable:Observable = new Observable();
        observable.addObserver(listener.myFunction);
        observable.removeObserver(listener.myFunction);

        observable.notify();
        
        chai.expect(called).equals(0);
     }
     
    @test "notify without an observer works and doesn't cause an exception"() {
        var observable:Observable = new Observable();

        observable.notify();
     }
     
    @test "test adding and removing multiple observers"() {
        var called1:number = 0;
        var called2:number = 0;
        var listener1 = { 
            myFunction():void {
                called1++;
            }
        }
        var listener2 = { 
            myFunction():void {
                called2++;
            }
        }
        var listener3:TestClass = new TestClass();
        var listener4:TestClass = new TestClass();
        var listener3Lambda:Function = () => { listener3.myFunction() };
        var listener4Lambda:Function = () => { listener4.myFunction() };

        var observable:Observable = new Observable();
        observable.addObserver(listener1.myFunction);
        observable.addObserver(listener2.myFunction);
        observable.addObserver(listener3Lambda);
        observable.addObserver(listener4Lambda);

        // first all should be notified
        observable.notify();

        observable.removeObserver(listener1.myFunction);
        observable.removeObserver(listener3Lambda);

        // then only 2 and 4 (because the other ones have been removed)
        observable.notify();
        
        chai.expect(called1).equals(1);
        chai.expect(called2).equals(2);
        chai.expect(listener3.called).equals(1);
        chai.expect(listener4.called).equals(2);
     }
     
    @test "clearObservers() removes all observers"() {
        var called1:number = 0;
        var called2:number = 0;
        var listener1 = { 
            myFunction():void {
                called1++;
            }
        }
        var listener2 = { 
            myFunction():void {
                called2++;
            }
        }
        var observable:Observable = new Observable();
        observable.addObserver(listener1.myFunction);
        observable.addObserver(listener2.myFunction);
        observable.clearObservers();

        observable.notify();
        
        chai.expect(called1).equals(0);
        chai.expect(called2).equals(0);
     }
     
    @test "adding an observer multiple times doesn't call the function multiple times"() {
        var called:number = 0;
        var listener = { 
            myFunction():void {
                called++;
            }
         }
        var observable:Observable = new Observable();
        observable.addObserver(listener.myFunction);
        observable.addObserver(listener.myFunction);
        observable.addObserver(listener.myFunction);
        observable.addObserver(listener.myFunction);
        observable.addObserver(listener.myFunction);

        observable.notify();
        
        chai.expect(called).equals(1);
     }
}
