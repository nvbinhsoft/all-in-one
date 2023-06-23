import * as process from "process";

// get config by config name from env
export function getConfig<T>(config: string): T | null {

  const configValue = process.env[config];

  if (configValue === "undefined") {
    return null;
  }

  return configValue as unknown as T;
}

// the input is a list of string and the output
// the config get from env base on the list of string
export function getConfigMap(config: string[]): { [key: string]: string } {
  const configMap: { [key: string]: string } = {};
  config.forEach((key) => {
    configMap[key] = process.env[key] || "" ;
  });
  return configMap;
}
