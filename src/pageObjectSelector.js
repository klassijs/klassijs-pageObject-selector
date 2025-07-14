const { astellen } = require('klassijs-astellen');
const { hideBin } = require('yargs/helpers');
const yargs = require('yargs/yargs');
const {Before} = require('@cucumber/cucumber')

const argv = yargs(hideBin(process.argv)).option('tags', {
  type: 'string',
  description: 'Tags to filter scenarios'
}).argv;

let tagNames;

Before((scenario) => {
  tagNames = scenario.pickle.tags;
});

function setPageObject(commandLineTag, pageObjectMap) {
  if (commandLineTag && commandLineTag in pageObjectMap) {
    return pageObjectMap[commandLineTag];
  } else {
    throw new Error('No matching page object found for tag: ' + commandLineTag);
  }
}

function getActivePageObject(pageObjectMap) {
  const tagFromCommandLine = argv.tags ? argv.tags : null;
  for (const tag of tagNames) {
    if (tag.name !== '@runall'){
      astellen.set ('activePageObject', setPageObject(tagFromCommandLine, pageObjectMap));
      const activePageObject = astellen.get('activePageObject');
      return setPageObject(tagFromCommandLine, pageObjectMap);
    }
  }
}

module.exports = { getActivePageObject };
