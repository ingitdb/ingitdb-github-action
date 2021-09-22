import * as core from '@actions/core';
import { readJSONSync } from './json-io';
import { wait } from './wait';

async function run(): Promise<void> {
  try {
    const data = readJSONSync('.ingitdb/.ingitdb.json');
    // eslint-disable-next-line no-console
    console.log('.ingitdb.json:', data);

    const ms: string = core.getInput('milliseconds');
    // eslint-disable-next-line i18n-text/no-en
    core.debug(`Waiting ${ms} milliseconds ...`); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    core.debug(new Date().toTimeString());
    await wait(parseInt(ms, 10));
    core.debug(new Date().toTimeString());

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed((error as Error).message);
  }
}

run();
