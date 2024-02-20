const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler");
const { lstat } = require("fs");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

// IOhandler.unzip(zipFilePath, pathUnzipped)//return a promise so it can wait for the unzip to finish
// .then(() => IOhandler.readDir()) 
// .then((files) => {})


//
async function main() { 
    console.log("Unzipping file...");
    await IOhandler.unzip(zipFilePath,pathUnzipped);
    const imgs = await IOhandler.readDir(pathUnzipped);
    const imgPaths = imgs.map((img) => path.join(pathUnzipped, img));
    const grayScale = await IOhandler.grayScale(imgPaths, pathProcessed);
    const sepia = await IOhandler.grayScale(imgPaths, pathProcessed);


};

main();