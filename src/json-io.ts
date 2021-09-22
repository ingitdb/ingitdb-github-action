// import the fs module, which allows us to do filesystem operations
// fs comes from nodejs, this is impossible with normal javascript
// running in a browser.
// You do not need to install this dependency, it is part of the
// standard library.
import {readFile, readFileSync, writeFile} from 'fs';
import {stringifySorted} from './json-sorter';

// Function to read and parse a JSON
export function readJSONSync(filename: string): unknown {
  const buffer = readFileSync(filename);
  return JSON.parse(buffer.toString());
}

export async function readJSON(filePath: string): Promise<unknown> {
  return new Promise<unknown>((resolve, reject) => {
    readFile(filePath, (err, buffer) => {
      if (err) {
        reject(err);
        return;
      }
      const s = buffer.toString();
      const json = JSON.parse(s);
      resolve(json);
    });
  });
}

export async function writeJSON(
  data: unknown,
  filePath: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const s = stringifySorted(data as any);
    console.log(filePath, ':\n', s);
    writeFile(filePath, s, err => {
      if (err) reject(err);
      resolve();
    });
  });
}
