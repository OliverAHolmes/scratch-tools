#!/usr/bin/env node
import yargs from 'yargs'; 
import openGoogleCalLink from './gen-google-cal-link.js';
import getOrgAuthUrl from './get-org-auth-url.js';

const args = yargs();

args.command({
    command: 'callink',
    describe: 'Opens a Google calendar invite.',
    builder: {
        dir: {
            describe: 'Directory to Scratch Org.',
            demandOption: false,
            type: "string"
          }
    },
    handler({dir}) {
        if(dir){
            console.log('Opening calendar invite for scratch org located here: ' + dir);
            openGoogleCalLink(dir);
        }else{
            console.log('Opening calendar invite for the scratch org located in this directory.');
            openGoogleCalLink();
        }
        
    }
},{
    command: 'getauthurl',
    describe: 'Gets an auth url to auto login to a scratch org.',
    builder: {
        dir: {
            describe: 'Directory to Scratch Org.',
            demandOption: false,
            type: "string"
          }
    },
    handler({dir}) {
        if(dir){
            console.log('Attaining link for: ' + dir);
            getOrgAuthUrl(dir);
        }else{
            console.log('Attaining link for org in this directory.');
            getOrgAuthUrl();
        }
        
    }
});

args.parse(process.argv.slice(2));