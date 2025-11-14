#!/usr/bin/env node

const { execSync } = require('child_process');
const process = require('process');
const { validateMessage } = require('git-commit-msg-linter/core/validate'); // ajuste o caminho conforme aqui

const commitMsgFile = process.argv[2];

if (!commitMsgFile) {
  console.error('Missing commit message file argument');
  process.exit(1);
}

const msg = execSync(`cat ${commitMsgFile}`).toString();

if (!validateMessage(msg)) {
  console.error('Invalid commit message:', msg);
  process.exit(1);
}

process.exit(0);
