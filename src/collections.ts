import {readJSON, writeJSON} from './json-io';
import {readdir, stat} from 'fs/promises';
import {join} from 'path';
import {Collection} from './models';

export async function processCollections(
  collections: Collection[]
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    console.log('processCollections');
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
  console.log('processCollection', definition);
  const records: {[id: string]: unknown} = {};
  const collection = {definition, records};
  await processCollectionRecords(collection);
  return Promise.resolve();
}

interface ICollection {
  definition: Collection;
  records: {[id: string]: unknown};
}

async function processCollectionRecords(
  collection: ICollection
): Promise<void> {
  console.log('processCollectionRecords', collection);
  const files = await readdir(collection.definition.dir);
  const tasks = files.map(async file =>
    processCollectionDirItem(collection, file)
  );
  await Promise.all(tasks);
  return Promise.resolve();
}

async function processCollectionDirItem(
  collection: ICollection,
  name: string
): Promise<unknown> {
  const path = join(collection.definition.dir, name);
  console.log('processCollectionDirItem', path);
  try {
    const stats = await stat(path);
    console.log(stats);
    if (stats.isDirectory()) {
      return processRecordDir(collection, path);
    }
  } catch (err) {
    console.log('ERROR:', err);
  }
  return Promise.resolve();
}

async function processRecordDir(
  collection: ICollection,
  path: string
): Promise<void> {
  console.log('processRecordDir', path);
  // return Promise.resolve();
  const jsonPath = `${path}/record.json`;
  const record = await readJSON(jsonPath);
  return writeJSON(record, jsonPath);
}
