const puppeteer = require('puppeteer');
const fs = require('fs');
const path=require('path');

function sleep(ms){
  return new Promise(resolve=>setTimeout(resolve,ms)) 
}

async function captureToPDF(browser, url, pdfOutputDir) {
  const pdfPath = path.join(pdfOutputDir, convertFilename(url));
  try {
    console.log(`capturing ${url} to pdf`);
    const page = await browser.newPage();
    await page.goto(url,{
      waitUntil: 'networkidle2',
    });
    await page.pdf({ path: pdfPath, format: "A4" });
    await page.close();
  } catch (err) {
    console.error(`error when capturing ${url}, error message: ${err.message}`);
  }
}

function convertFilename(url) {
  // 获取地址中的文件名，并替换 html 为 pdf
  return url.split("/").pop().replace('html','pdf').replace(' ','').replace('|','')
}

async function main(){
  if (process.argv.length != 4) {
    console.log("error!");
    console.log("usage: node html2pdf.js <html_input_dir> <pdf_output_dir>")
    process.exit(-1);
  }

  fs.mkdirSync(process.argv[3],{recursive: true})

  const urls = fs.readdirSync(process.argv[2])

  const browser = await puppeteer.launch();

  for (var url of urls) {
    await captureToPDF(browser, 'file://'+process.argv[2]+'/'+url, process.argv[3]);
    // 控制转换频率
    await sleep(1000);
  }

  await browser.close();
}

main()
