const { copyFile } = require('fs');
const { existsSync } = require('fs');
const fs = require('fs/promises');
const path = require('path');
const source= path.resolve(__dirname, 'sourceFolder');
const target= path.resolve(__dirname, 'destFolder');
const { EOL } = require('os');

const my_readdir = async(dir) => {
    try {
        const files = await fs.readdir(dir,{recursive:true})
        for (const file of files) {
            console.log(file)
            if (file.startsWith('.')) {
                console.log(`${EOL}Pass ${file}, which is a hidden file`)
            } else if (await isFolder(path.join(source,file))) {
                console.log(`It is a directory: ${file}`);
                if (!existsSync(path.join(target,file))) {
                    // // await fs.mkdir(file)
                    console.log(`${EOL}Making directory ${path.join(source,file)}`)
                }
            } else {
                // // await copyFile()
                console.log(`${EOL}Copying file from ${path.join(source,file)} to ${path.join(target,file)}`)
            }
    }
    } catch (err) {
        console.log(err)
    }
}
const main = async () => {
    await my_readdir(source)
}

const isFolder = async (dir) => { 
    try {
        const stats = await fs.stat(dir)
        return stats.isDirectory()
    }
    catch(err) {
        console.log(err)
    }
}
main()