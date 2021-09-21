// Spec http://www.ecma-international.org/ecma-262/6.0/#sec-json.stringify
const replacer = (key: unknown, value: any) =>
  value instanceof Object && !(value instanceof Array)
    ? Object.keys(value)
      .sort()
      .reduce((sorted: any, key: string) => {
        sorted[key] = value[key];
        return sorted;
      }, {})
    : value;
// Usage: JSON.stringify({c: 1, a: { d: 0, c: 1, e: {a: 0, 1: 4}}}, replacer);


export const stringifySorted = (value: any) => JSON.stringify(value, replacer, 2);

