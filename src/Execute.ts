import { exec } from "child_process";

export function executeAsync(command: string): Promise<string>{
    return new Promise((resolve) => {
        exec(command, function(error, stdout, stderr){ 
            resolve(stdout.trim()); 
        });
    })
}