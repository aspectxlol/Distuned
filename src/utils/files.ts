import fs from 'node:fs'

export const getAllFiles = (path: fs.PathLike, type: string) => {
    const rawFiles = fs.readdirSync(path)
    let files: string[] = []
    for (const file of rawFiles){
        if (['.ts', '.js'].some((ex) => file.endsWith(ex))){
            files.push(`${__dirname}/../${type}/${file}`)
        }else{
            const folder = fs.readdirSync(`${path}/${file}`).filter(file => ['.ts', '.js'].some((ex) => file.endsWith(ex)))
            for (const file2 of folder){
                files.push(`${__dirname}/../${type}/${file}/${file2}`)
            }
        }
    }
    return files
}

export const commandFiles = getAllFiles('src/commands', 'commands')

