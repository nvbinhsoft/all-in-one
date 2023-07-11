// add unit test for sensitive decorator with 100% code coverage

import {Sensitive} from "@all-in-one/core/decorator";

describe('SensitiveDecorator', () => {

    it('should return true if class is marked with @Sensitive', () => {
      // arrange
      @Sensitive
      class TestSensitiveClass {

      }

      const testSensitiveClass = new TestSensitiveClass();
      // act

      testSensitiveClass

      // assert
    });
})
