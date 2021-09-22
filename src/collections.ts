import { readdir } from "fs";
import { Collection } from "./models";
import { readJSON, writeJSON } from "./json-io";

export async function processCollections(collections: Collection[]): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const tasks = collections.map(processCollection);
    const results = await Promise.all(tasks);     // Gather up the results.
    resolve();
  });
}

async function processCollection(definition: Collection): Promise<void> {
  return new Promise((resolve, reject) => {
    const records: { [id: string]: unknown } = {};
    const collection = { definition, records };
    processCollectionRecords(collection).then(() => {
      resolve();
    }).catch(reject);
  });
}

interface ICollection {
  definition: Collection;
  records: { [id: string]: unknown };
}

async function processCollectionRecords(collection: ICollection): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    readdir(collection.definition.dir, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = files.map(file => processRecordDir(collection, file));
      Promise.all(tasks).then(() => resolve()).catch(reject);
    });
  });
}

async function processRecordDir(collection: ICollection, dirPath: string): Promise<unknown> {
  const jsonPath = dirPath + "/record.json";
  const record = await readJSON(jsonPath);
  await writeJSON(record, jsonPath);
  return Promise.resolve(record);
}
