const { astellen } = require('klassijs-astellen');
const { hideBin } = require('yargs/helpers');
const yargs = require('yargs/yargs');
const { Before } = require('@cucumber/cucumber');

const argv = yargs(hideBin(process.argv)).option('tags', {
  type: 'string',
  description: 'Tags to filter scenarios'
}).argv;

let tagNames;

Before((scenario) => {
  if (scenario.pickle && scenario.pickle.tags) {
    tagNames = scenario.pickle.tags;
  } else if (scenario.tags) {
    tagNames = scenario.tags;
  } else if (scenario.gherkinDocument && scenario.gherkinDocument.feature) {
    tagNames = scenario.gherkinDocument.feature.tags || [];
  } else {
    tagNames = [];
  }
});

function setPageObject(commandLineTag, pageObjectMap, availableTags) {
  const matchingTag = availableTags.find(tag => tag.name === commandLineTag);
  
  if (matchingTag && matchingTag.name in pageObjectMap) {
    return pageObjectMap[matchingTag.name];
  } else {
    throw new Error('No matching page object found for tag: ' + commandLineTag);
  }
}

function getActivePageObject(pageObjectMap) {
  const tagFromCommandLine = argv.tags ? argv.tags : null;
  
  if (!tagNames || !Array.isArray(tagNames)) {
    throw new Error('No tags available. Make sure Before hook has been executed.');
  }
  
  if (tagFromCommandLine) {
    const activePageObject = setPageObject(tagFromCommandLine, pageObjectMap, tagNames);
    astellen.set('activePageObject', activePageObject);
    return activePageObject;
  }
  
  for (const tag of tagNames) {
    if (tag.name !== '@runall') {
      const activePageObject = setPageObject(tag.name, pageObjectMap, tagNames);
      astellen.set('activePageObject', activePageObject);
      return activePageObject;
    }
  }
  
  throw new Error('No valid tags found. All tags are @runall.');
}

module.exports = { getActivePageObject };
