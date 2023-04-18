/*
Copyright 2023 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

const awsFunctions = require('../../lib/awsFunctions')
const sdk = require('../../../config/config')

main()

async function main() {
  try {
    const client = await sdk.initSDK()

    const input = {
      // href: await awsFunctions.getSignedUrl('getObject', 'input/input01.png'), //ex: AWS S3 (s3://<awsConfig.bucketName>/input/input01.png)
      href: 'https://raw.githubusercontent.com/kmikawa/testfiles/main/input/input01.png',
      storage: sdk.psApiLib.Storage.EXTERNAL,
    }

    const output = {
      href: await awsFunctions.getSignedUrl('putObject', 'output/test03.png'),
      storage: sdk.psApiLib.Storage.EXTERNAL,
      type: sdk.psApiLib.MimeType.PNG
    }

    const job = await client.autoTone(input, output)
    console.log(`Response: ${JSON.stringify(job,null,2)}\n`)
    console.log(`Output File: ${await awsFunctions.getSignedUrl('getObject', 'output/test03.png')}\n`)

  } catch (e) {
    console.error(e)
  }
}