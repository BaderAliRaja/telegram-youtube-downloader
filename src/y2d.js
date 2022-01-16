var exec = require('child_process').exec;

function execute(command){
    return new Promise((resolve) => {
        exec(command, function(error, stdout, stderr){ 
            resolve(stdout); 
        });
    })
}

async function main() {
    const resp = await execute(`youtube-dl --get-url X`);
    console.log(
        resp
            .split("\n")
            .map(url => decodeURI(url))
            .find(url => url.includes(`mime=audio`))
    );
}

main();