const { astellen } = require('klassijs-astellen');
const { hideBin } = require('yargs/helpers');
const yargs = require('yargs/yargs');

const argv = yargs(hideBin(process.argv)).option('tags', {
  type: 'string',
  description: 'Tags to filter scenarios'
}).argv;

const pageObjectMap = require('../../../shared-objects/pageObjectData');

function setPageObject(commandLineTag) {
  console.log('Tag from command line:', commandLineTag);
  if (commandLineTag && commandLineTag in pageObjectMap) {
    console.log('Matching tag ============:', commandLineTag);
    return pageObjectMap[commandLineTag];
  } else {
    throw new Error('No matching page object found for tag: ' + commandLineTag);
  }
}

function getActivePageObject(scenario) {
  const tagFromCommandLine = argv.tags ? argv.tags : null;
  for (const tag of scenario.pickle.tags) {
    if (tag.name === '@runall'){
      astellen.set ('activePageObject', setPageObject(tagFromCommandLine));
    }
  }
}

module.exports = { getActivePageObject };
