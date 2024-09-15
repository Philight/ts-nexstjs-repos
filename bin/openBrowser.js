#! /usr/bin/env node
import open from 'open';

// ====================================================================================

const scriptArguments = process.argv.slice(2);

const host = scriptArguments[0] ?? 'http://localhost';
const port = scriptArguments[1] ?? '';

// ====================================================================================
console.log('openBroswer scriptArguments', scriptArguments)
console.log('openBroswer', host, port)
await open(`${host}:${port}`);