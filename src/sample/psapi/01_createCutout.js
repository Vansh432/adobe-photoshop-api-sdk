// How to run:
// node src/sample/psapi/01_createCutout.js

const awsFunctions = require('../../lib/awsFunctions')
const sdk = require('../../../config/config')

main()

async function main() {
  try {
    const client = await sdk.initSDK()

    const input = {
      // href: await awsFunctions.getSignedUrl('getObject', 'input/input01.jpg'), //ex: AWS S3 (s3://<awsConfig.bucketName>/input/input01.jpg)
      href: 'https://raw.githubusercontent.com/kmikawa/testfiles/main/input/input01.jpg',
      storage: sdk.psApiLib.Storage.EXTERNAL,
    }

    const output = {
      href: await awsFunctions.getSignedUrl('putObject', 'output/test01.png'),
      storage: sdk.psApiLib.Storage.EXTERNAL,
      type: sdk.psApiLib.MimeType.PNG
    }

    const job = await client.createCutout(input, output)
    console.log(`Response: ${JSON.stringify(job,null,2)}\n`)
    console.log(`Output File: ${await awsFunctions.getSignedUrl('getObject', 'output/test01.png')}\n`)
  } catch (e) {
    console.error(e)
  }
}