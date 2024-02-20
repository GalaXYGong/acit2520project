/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const unzipper = require("yauzl-promise"),
  // fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");


/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */

const yauzl = require('yauzl-promise'),
  fs = require('fs'),
  {pipeline} = require('stream/promises');



// unzip1('myfile.zip', 'unzipped');
// unzip('myfile.zip', 'unzipped')
const unzip = async (pathIn, pathOut) => {
  // use yazl to unzip the file
  //returm a promise
  const zip = await yauzl.open(pathIn);
  try {
    for await (const entry of zip) {
      if (entry.filename.endsWith('/')) {
        // await fs.promises.mkdir(`${pathOut}/${entry.filename}`);
        // console.log(`It is a folder: ${pathOut}`)
        {}
      } else if  (entry.filename.includes('/')) {
        // console.log(`This is a file in a folder: ${entry.foldername}/${entry.filename}`)
        {}
      } else {
        const readStream = await entry.openReadStream();
        const writeStream = fs.createWriteStream(
          `${pathOut}/${entry.filename}`
        );
        await pipeline(readStream, writeStream);
      }
    }
  } finally {
    await zip.close();
  }
  };
// pathIn = "myfile.zip";
// pathOut = "unzipped";

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const { readdir} =require('fs/promises');
const { listenerCount } = require("process");
const file_list = [];
const readDir = async (dir) => {
  try {
    const files = await readdir(dir);
    for (const file of files)
      {
      if (file.endsWith('.png')) {
        file_list.push(file);
        console.log(`${file} is a png`)
      }}
      return file_list;
  } catch (err) {
    console.error(err);
  }
}; // return array of png files. 注意extention是png的才要。
// console.log(readDir('unzipped'))

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn_list, pathOut) => {
  for (const pathIn of pathIn_list) {
    
  fs.createReadStream(pathIn)
  .pipe(
    new PNG({
      filterType: 4,
    })
  )
  .on("parsed", function () {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var idx = (this.width * y + x) << 2;
        gray= (this.data[idx]+this.data[idx+1]+this.data[idx+2])/3;
        // invert color
        this.data[idx] = gray;
        this.data[idx + 1] = gray;
        this.data[idx + 2] = gray;
        // and reduce opacity
        // this.data[idx + 3] = this.data[idx + 3] >> 1;
      }
    }
    this.pack().pipe(fs.createWriteStream(path.join(pathOut, path.basename(pathIn))));
  });
}};


const sepia = (pathIn_list, pathOut) => {
  for (const pathIn of pathIn_list) {
    
  fs.createReadStream(pathIn)
  .pipe(
    new PNG({
      filterType: 4,
    })
  )
  .on("parsed", function () {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var idx = (this.width * y + x) << 2;
        // invert color
        const R = this.data[idx];
        const G = this.data[idx+1];
        const B = this.data[idx+2];
        // const l = (30*r + 59*g + 11*b)
        this.data[idx] = Math.min(0.393*R + 0.769*G + 0.189*B,255)
        this.data[idx + 1] = Math.min(0.349*R + 0.686*G + 0.168*B,255)
        this.data[idx + 2] = Math.min(0.272*R + 0.534*G + 0.131*B,255)
        /*
        newRed =   0.393*R + 0.769*G + 0.189*B
        newGreen = 0.349*R + 0.686*G + 0.168*B
        newBlue =  0.272*R + 0.534*G + 0.131*B
        */
        // and reduce opacity
        // this.data[idx + 3] = this.data[idx + 3] >> 1;
      }
    }
    this.pack().pipe(fs.createWriteStream(path.join(pathOut, path.basename(pathIn))));
  });
}};

// list = [
//   'unzipped/in.png',
//   'unzipped/in1.png',
//   'unzipped/in2.png'
// ]
// sepia(list,"./sepia")
module.exports = {
  unzip,
  readDir,
  grayScale,
  sepia
};
