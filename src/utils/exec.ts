import {execSync} from 'child_process'

export function run(cmd : string) : string{
    return execSync(cmd , {encoding : 'utf-8'}).trim();
}