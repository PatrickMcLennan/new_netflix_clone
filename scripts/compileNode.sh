#!/bin/bash
cd ..
source .env

clear

echo
echo  Running graphql-codegen to generate our Types + Hooks based on our GraphQL Schema . . . 
echo
npm run generate

if [ $? -eq 0 ]
then
  break;
else
  echo
  echo  Error, graphql-codegen exited with an error.  Exiting with a 1
  echo
fi

echo
echo  Compiling our Next.js into static HTML and Express Server from TypeScript -> JavaScript . . .
echo
npm run node:build:prod

if [ $? -eq 0 ]
then
  break;
else
  echo
  echo  Error, npm script node:build:prod exited with an error.  Existing with a 1
  echo
fi

echo
echo  Running jest unit tests
echo
npm run test

if [ $? -eq 0 ]
then
  echo
  echo  Success, Exiting with a 0
  echo
  exit 0
else
  echo
  echo  Error, Tests did not pass, aborting build.  Exiting with a 1
  echo
fi
