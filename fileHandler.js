const fs = require('fs');
const readline = require('readline')

const netflix = 'Netflix'
const youtube = 'Youtube'

module.exports.transfer = function (sourceFile, sourceWebsite) {
  const readFileStream = fs.createReadStream(sourceFile)
  const readLineStream = readline.Interface({
    input: readFileStream
  })
  const targetFilePath = './output/'
  const targetFileName = createResultName(sourceFile)

  readLineStream.on('line', (data) => {
    const input = removeTag(data, sourceWebsite)
    if (input) fs.appendFileSync(targetFilePath +  targetFileName, input)
  })
  console.log('Write in file success.')

  return targetFileName
}

function createResultName(str) {
  return str.match(/(?:.*\/)(.*)(?:\.)/)[1] + '.txt'
}

function removeTag(data, sourceWebsite) {
  const siteObject = {
    'Youtube': removeYoutubeTag,
    'Netflix': removeNetflixTag
  }

  return siteObject[sourceWebsite](data)
}

function removeYoutubeTag(data) {
  const regExp = /(?:<p.*?>)(.*?)(?:<\/p>)|(.*?)(?:<\/p>)|(?:<p.*?>)(.*)/
  let result = ''

  const matchedResult = data.match(regExp)

  if(!matchedResult) return

  const matchedString = matchedResult[1] || matchedResult[2] || matchedResult[3]
  result += matchedString + '\n'

  return result
}

function removeNetflixTag(data) {
  const regExpWithSpanGlobal = /(?:<span.*?>)(.*?)(?:<[/]span>)/g
  const regExpBetweenSpan = /(?:<span.*?>)(.*?)(?:<[/]span>)/

  const matchedStrings = data.match(regExpWithSpanGlobal)
  let result = ''

  if(!matchedStrings) return

  matchedStrings.forEach((matchStr) => {
    result += matchStr.match(regExpBetweenSpan)[1] + '\n'
  })
  return result
}
