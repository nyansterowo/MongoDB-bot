const fs = require('fs');
const path = require('path');

function findFiles(folderPath){
    const files = []
    folderPath = path.isAbsolute(folderPath) ? folderPath : path.join(process.cwd(), folderPath)
    const folder = fs.readdirSync(folderPath, { withFileTypes: true })

    for(const file of folder){
        const pathFile = path.join(folderPath, file.name)
        if(file.isDirectory()){
            files.push(...findFiles(pathFile))
            continue
        }
        files.push(pathFile)
    }
    return files;
}

CommandsLoader = async(client) => {
    client.list = [];
    for(const file of findFiles("./src/commands/")){
        try {
            const { dir, base } = path.parse(file);
            const command = require(file);

            client.list.push(command.data.toJSON());
            client.commands.set(command.data.name, command);
        }catch(err) {
            console.error(`[COMMANDS] Command ${file.split("src\\commands\\")[1]} failed to load. ${err.message.split("\n")[0]}`);
        }
    }
}

module.exports = CommandsLoader;