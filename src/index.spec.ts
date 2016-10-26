import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { expect } from "chai";
 
@suite class Hello {
    @test "world"() {
        expect(234).above(200);
     }
}
