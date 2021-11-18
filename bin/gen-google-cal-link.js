// const exec = require('child_process').exec;
import * as process from 'child_process'; 
import open from 'open'; 
// const open = require('open');

export default function openGoogleCalLink(projectDirAddress = null){
    const googleCalendarURL = 'https://www.google.com/calendar/render?action=TEMPLATE&text=Scratch+Org+Expiries:+{}&dates={}&location=My+development+environment&sf=true&output=xml';

    String.prototype.format = function () {
        var i = 0, args = arguments;
        return this.replace(/{}/g, function () {
            return typeof args[i] != 'undefined' ? args[i++] : '';
        });
    };

    function execute(command, callback){
        process.exec(command, function(error, stdout, stderr){ callback(stdout); });
    };

    function formatGoogleCalendarDate(dateFromSFDX){
        const dateArray = dateFromSFDX.split('-');
        const date = new Date(dateFromSFDX);
        date.setDate(date.getDate() + 1);
        const formattedDatePlusDay = date.toISOString().split('T')[0].split('-');
        return dateArray[0] + 
            dateArray[1] + 
            dateArray[2] + '/' + 
            formattedDatePlusDay[0] + 
            formattedDatePlusDay[1] + 
            formattedDatePlusDay[2];
    }

    async function processLineByLine(data) {

        let expirationDate = '';
        let instanceUrl = '';

        // split the contents by new line
        const lines = data.split(/\r?\n/);

        lines.map(line => {
            if(line.includes('Expiration Date')){
                expirationDate = formatGoogleCalendarDate(line.split('  ')[1]);
            }

            if(line.includes('Instance Url')){
                instanceUrl = line.split('     ')[1];
            }

        });

        open(googleCalendarURL.format(instanceUrl, expirationDate));
    }

    const dirAddress = projectDirAddress ? 'cd ' + projectDirAddress + ';' :  '';

    execute(dirAddress + "sfdx force:org:display", function(data){
        processLineByLine(data);
    });
}