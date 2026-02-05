import * as allure from 'allure-js-commons';
import { camelCaseToPhrase, capitalize } from './stringHelpers';

export function parseTestTreeHierarchy(
  fileName: string,
  logger: { debug: (msg: string) => void }
): [string, string, string | null] {
  const testFolder = 'tests/';
  const index = fileName.indexOf(testFolder);

  if (index === -1) {
    return ['ParaBank', 'General', null];
  }

  const path = fileName.substring(index + testFolder.length);
  const parts = path.split('/').filter(Boolean);
  const lastPart = parts[parts.length - 1] || '';

  const lastPartClean = lastPart.replace(/\.[^.]+$/, '');
  const folderParts = parts.slice(0, -1);
  const allParts = [...folderParts, lastPartClean];

  const attributes = allParts.map((part) =>
    capitalize(camelCaseToPhrase(part))
  );

  const parentSuite = attributes[0] || 'ParaBank';
  const suite = attributes[1] || 'General';
  const subSuite = attributes.length > 2 ? attributes[2] : null;

  const hierarchy = JSON.stringify([parentSuite, suite, subSuite]);
  logger.debug(`Parsed test hierarchy: ${hierarchy}`);

  return [parentSuite, suite, subSuite];
}

export function addSeverity(severity: string): void {
  allure.severity(severity);
}
