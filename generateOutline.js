import {PDFDocument,rgb} from 'pdf-lib'
import fs from 'fs'

var page = 1;
async function main() {
    if (process.argv.length != 3) {
        console.log("error!");
        console.log("usage: node generateOutline.js <pdf_input_dir>")
        process.exit(-1);
      }
    //todo 三个参数
    const urls = fs.readdirSync(process.argv[2]).sort()
    
    for (let index = 0; index < urls.length; index++) {
        const item =urls[index];
        if (item == ".DS_Store"){
            continue
        }
        const path = process.argv[2]+'/'+item
        const filename = path.split('/').pop().replace('.pdf','').replace("【daobanke.com】",'')
        // .replace(/\d{2}/,'')
        const pdf = await PDFDocument.load(fs.readFileSync(path))
        console.log(filename+" "+page)
        page += pdf.getPageCount()
    }
}

main();
