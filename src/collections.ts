import { readJSON, writeJSON } from "./json-io";
import { readdir } from "fs/promises";
import { Collection } from "./models";

export async function processCollections(
  collections: Collection[]
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const tasks = collections.map(processCollection);
    try {
      await Promise.all(tasks); // Gather up the results.
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

async function processCollection(definition: Collection): Promise<void> {
  const records: { [id: string]: unknown } = {};
  const collection = { definition, records };
  return processCollectionRecords(collection);
}

interface ICollection {
  definition: Collection;
  records: { [id: string]: unknown };
}

async function processCollectionRecords(collection: ICollection): Promise<void> {
  const files = await readdir(collection.definition.dir);
  const tasks = files.map(async file => processRecordDir(collection, file));
  await Promise.all(tasks);
}

async function processRecordDir(
  collection: ICollection,
  dirPath: string
): Promise<unknown> {
  const jsonPath = `${dirPath}/record.json`;
  const record = await readJSON(jsonPath);
  await writeJSON(record, jsonPath);
  return Promise.resolve(record);
}
