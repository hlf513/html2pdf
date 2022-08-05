const merge = require('easy-pdf-merge');
const fs = require('fs');

function main(){
    if (process.argv.length != 4) {
        console.log("error!");
        console.log("usage: node mergepdf.js <pdf_input_dir> <pdf_output_filename>")
        process.exit(-1);
    }

    var urls = new Array()
    fs.readdirSync(process.argv[2]).forEach(item=>{
        urls.push(process.argv[2]+'/'+item)
    })
    console.log(urls.sort())

    // maxBuffer: 1GB （执行子命令时需要）
    merge(urls.sort(),process.argv[3], {maxBuffer:1024*1024*1024},function (err) {
        if (err) {
            return console.log(err)
        }
        console.log('Success')
    }); 
}

main()
