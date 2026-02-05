import * as allure from 'allure-js-commons';
import { camelCaseToPhrase, capitalize } from './stringHelpers';

export function parseTestTreeHierarchy(fileName, logger) {
  const testFolder = 'tests/';
  const index = fileName.indexOf(testFolder);

  if (index === -1) {
    return ['ParaBank', 'General', null];
  }

  const path = fileName.substring(index + testFolder.length);
  const parts = path.split('/').filter(Boolean);
  const lastPart = parts[parts.length - 1] || '';

  // Remove file extension from last part (e.g. register.spec.js -> register)
  const lastPartClean = lastPart.replace(/\.[^.]+$/, '');
  const folderParts = parts.slice(0, -1);
  const allParts = [...folderParts, lastPartClean];

  const attributes = allParts.map(part =>
    capitalize(camelCaseToPhrase(part)),
  );

  // Ensure 3 levels: parentSuite, suite, subSuite (subSuite can be null)
  const parentSuite = attributes[0] || 'ParaBank';
  const suite = attributes[1] || 'General';
  const subSuite = attributes.length > 2 ? attributes[2] : null;

  const hierarchy = JSON.stringify([parentSuite, suite, subSuite]);
  logger.debug(`Parsed test hierarchy: ${hierarchy}`);

  return [parentSuite, suite, subSuite];
}

export function addSeverity(severity) {
  return allure.severity(severity);
}
