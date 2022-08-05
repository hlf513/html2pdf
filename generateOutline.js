const {PDFDocument,rgb} = require('pdf-lib')
const fs = require('fs');

var page = 1;
async function main() {
    if (process.argv.length != 3) {
        console.log("error!");
        console.log("usage: node generateOutline.js <html_input_dir>")
        process.exit(-1);
      }
    //todo 三个参数
    const urls = fs.readdirSync(process.argv[2])
    
    for (let index = 0; index < urls.length; index++) {
        const item =urls[index];
        const path = process.argv[2]+item
        const filename = path.split('/').pop().replace('.pdf','').replace(/\d{2}/,'')
        const pdf = await PDFDocument.load(fs.readFileSync(path))
        console.log(filename+" "+page)
        page += pdf.getPageCount()
    }
}

main();