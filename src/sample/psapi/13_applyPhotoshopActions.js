/*
Copyright 2023 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

const awsLib = require('../../lib/awsLib')
const sdk = require('../../../config/config')

main()

async function main() {
  try {
    const client = await sdk.initSDK()

    const input = {
      // href: await awsLib.getSignedUrl('getObject', 'input/input01.jpg'), //ex: AWS S3 (s3://<awsConfig.bucketName>/input/input01.jpg)
      href: 'https://raw.githubusercontent.com/adobe/adobe-photoshop-api-sdk/testfiles/main/input/input01.jpg',
      storage: sdk.psApiLib.Storage.EXTERNAL,
    }

    const output = {
      href: await awsLib.getSignedUrl('putObject', 'output/test13.png'),
      storage: sdk.psApiLib.Storage.EXTERNAL,
      type: sdk.psApiLib.MimeType.PNG
    }

    const options = {
      actions: [
        {
          // href: await awsLib.getSignedUrl('getObject', 'input/fisheye.atn'), //ex: AWS S3 (s3://<awsConfig.bucketName>/input/fisheye.atn)
          href: 'https://raw.githubusercontent.com/adobe/adobe-photoshop-api-sdk/input/fisheye.atn',
          storage: sdk.psApiLib.Storage.EXTERNAL,
        }
      ]
    }

    const job = await client.applyPhotoshopActions(input, output, options)
    console.log(`${job.isDone()} - ${job.jobId}`)
    console.log(`Response: ${JSON.stringify(job,null,2)}`)
    console.log(`Output File: ${await awsLib.getSignedUrl('getObject', 'output/test13.png')}\n`)

  } catch (e) {
    console.error(e)
  }
}
