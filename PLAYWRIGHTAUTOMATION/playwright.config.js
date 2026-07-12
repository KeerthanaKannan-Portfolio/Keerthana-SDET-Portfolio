// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { report } from 'node:process';

const config= ({
  testDir: './tests',
  timeout : 30000,
  expect :
  {
    timeout :5000
  },
  reporter :'html',
  use: 
  {
    browserName :'chromium',
    headless : false,
    screenshot: 'on',
    trace : 'on'
   
  }

});
module.exports= config;

