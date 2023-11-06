#! /usr/bin/env node
import * as prettier from 'prettier';
import { parseArgs } from 'node:util';
import fs from 'fs';

const writeFile = ({ path, content }) =>
  fs.writeFile(
    path,
    content,
    (err) => err && console.error('Failed to write file.'),
  );

const parseArguments = () => {
  const {
    positionals: [url],
    values: { outputFile },
  } = parseArgs({
    allowPositionals: true,
    options: { outputFile: { type: 'string', short: 'e' } },
  });

  return { url, outputFile }
}

const getDecodedUrl = url => {
  if (!url) {
    throw new Error('URL not provided.')
  }

  try {
    new URL(url);
  } catch (e) {
    throw new Error('Provided URL is not valid.');
  }

  return decodeURIComponent(url)
}

const getGraphQlQueryComponentFromUrl = (decodedUrl) => {
  const query = decodedUrl.match(/\{(.*)\}/)?.[0];
  if (!query) {
    throw new Error('GraphQL query not found in URL.');
  }
  return query
}

const main = async () => {
  const { url, outputFile } = parseArguments();
  const decodedUrl = getDecodedUrl(url)
  const unformattedQuery = getGraphQlQueryComponentFromUrl(decodedUrl)
  const formattedQuery = await prettier.format(unformattedQuery, { parser: 'graphql' });
  console.log(formattedQuery);

  outputFile && writeFile({ path: outputFile, content: formattedQuery });
};

main();
