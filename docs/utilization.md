# Start Project
`npx create-next-app <projepp>`

## Migrate from version 2.x to 3.x AWS SDK for JavaScript

The collection of codemod scripts in aws-sdk-js-codemod helps migrate your existing AWS SDK for JavaScript (v2) application to use v3 APIs. You can run the transform as follows.

- Version 2  npm i aws-sdk
- Version 3  npm i @aws-sdk/client-s3

`npx aws-sdk-js-codemod -t v2-to-v3 example.tsx`
