// import the fs module, which allows us to do filesystem operations
// fs comes from nodejs, this is impossible with normal javascript
// running in a browser.
// You do not need to install this dependency, it is part of the
// standard library.
import {promises as fsp} from 'fs';
import {readFileSync} from 'fs';
import {stringifySorted} from './json-sorter';

// Function to read and parse a JSON
export function readJSONSync(filename: string): unknown {
  const buffer = readFileSync(filename);
  return JSON.parse(buffer.toString());
}

export async function readJSON(filePath: string): Promise<unknown> {
  const buffer = await fsp.readFile(filePath);
  const s = buffer.toString();
  // console.log('content:', s);
  const json = JSON.parse(s);
  return json;
}

export async function writeJSON(
  data: unknown,
  filePath: string
): Promise<void> {
  const s = stringifySorted(data as any);
  // console.log(filePath, ":\n", s);
  await fsp.writeFile(filePath, s);
}
