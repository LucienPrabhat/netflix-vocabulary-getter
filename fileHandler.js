const fs = require('fs');
const readline = require('readline')

module.exports.transfer = function (sourceFile) {
  const readFileStream = fs.createReadStream(sourceFile)
  const readLineStream = readline.Interface({
    input: readFileStream
  })
  const targetFilePath = './output/'
  const targetFileName = createResultName(sourceFile)

  readLineStream.on('line', (data) => {
    const input = removeXmlTag(data)
    if (input) fs.appendFileSync(targetFilePath +  targetFileName, input)
  })
  console.log('Write in file success.')

  return targetFileName
}

function createResultName(str) {
  return str.match(/(?:.*\/)(.*)(?:\.)/)[1] + '.txt'
}

function removeXmlTag(data) {
  const regEXpWithSpanGlobal = /(?:<span.*?>)(.*?)(?:<[/]span>)/g
  const regEXpBetweenSpan = /(?:<span.*?>)(.*?)(?:<[/]span>)/

  const matchedStrings = data.match(regEXpWithSpanGlobal)
  let result = ''

  if(!matchedStrings) return

  matchedStrings.forEach((matchStr) => {
    result += matchStr.match(regEXpBetweenSpan)[1] + '\n'
  })
  return result
}
