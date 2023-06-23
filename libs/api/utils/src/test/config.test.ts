// jest test file
// Path: libs/api/utils/src/test/config.test.ts

// write a test function
import {getConfig, getConfigMap} from '../lib/config';
import * as process from "process";

describe('getConfig', () => {

  it('should return the config', () => {

    const envName = "test";
    // arrange
    process.env["envName"] = envName;

    console.log(process.env["envName"]);

    // act
    const config = getConfig<string>("envName");

    // assert
    expect(config).toBe("test");
    expect(typeof config).toBe("string");
  });

  it('should return config map', function () {

    // arrange
    const config = ["envName", "envName2"];
    process.env["envName"] = "test";
    process.env["envName2"] = "test2";

    // act
    const configMap = getConfigMap(config);

    // assert
    expect(configMap).toEqual({envName: "test", envName2: "test2"});

  });


  it('should return config map with default empty string', function () {

    // arrange
    const config = ["envName", "wrongEnvName"];
    process.env["envName"] = "test";

    // act
    const configMap = getConfigMap(config);

    // assert
    expect(configMap).toEqual({envName: "test", wrongEnvName: ""});

  });

  it('should return null if the config is not found', () => {
    // arrange
    process.env["envName"] = undefined;

    // act
    const config = getConfig<string>("envName");

    // assert
    expect(config).toBe(null);
  });

});

