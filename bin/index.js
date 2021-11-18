#!/usr/bin/env node
import yargs from 'yargs'; 
import openGoogleCalLink from './gen-google-cal-link.js';

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
})

args.parse(process.argv.slice(2));