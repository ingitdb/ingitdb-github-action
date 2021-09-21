// import the fs module, which allows us to do filesystem operations
// fs comes from nodejs, this is impossible with normal javascript
// running in a browser.
// You do not need to install this dependency, it is part of the
// standard library.
import {readFileSync} from 'fs'

// Function to read and parse a JSON
export function readJSON(filename: string): unknown {
  const buffer = readFileSync(filename)
  return JSON.parse(buffer.toString())
}
