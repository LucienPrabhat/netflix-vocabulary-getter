// receive file from upload

const receivedFile = './data/carbon/carbon_s1_01.xml'
const sourceWebsite = 'Netflix'

const fileHandler = require('./fileHandler')
const result = fileHandler.transfer(receivedFile, sourceWebsite)

console.log('Send file: ' ,result)

// send result(return file path ex: http://xxxxxx.xx/output/xxx.txt)