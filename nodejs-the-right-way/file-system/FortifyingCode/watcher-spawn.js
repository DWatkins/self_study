"use strict"
const fs = require('fs');
const spawn = require('child_process').spawn;
const filename = process.argv[2];

if(!filename){
    throw Error("A file to watch must be specified!");
}

if(fs.existsSync(filename)){
   var  watcher = fs.watch(filename, function(eventtype, wfilename) {
        if(eventtype === 'rename'){
            process.stdout.write(wfilename + ' has been moved or deleted!\n');
            watcher.close();
        }
        else if (eventtype === 'change') {//eventtype only has two options, no need for else if
            let ls = spawn('ls', ['-lh', filename]);
            process.stdout.write(wfilename + ' has changed!\n')
            ls.stdout.pipe(process.stdout);

        }
    });
    console.log("Now watching " + filename + " for changes...");
} else {
    console.log(filename + " does not exist!");
}
