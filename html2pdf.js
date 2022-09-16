import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

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
    console.error('ERR_INVALID_URL, 表示使用的是相对路径，请使用绝对路径；因为chromium运行相对路径会找不到文件')
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

  // headless:true 表示后台运行 chromium, false 表示前台运行 chromium
  // --no-sandbox 是 linux 必填参数
  const browser = await puppeteer.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});

  for (var url of urls) {
    if (url == ".DS_Store"){
      continue
    }
    await captureToPDF(browser, 'file://'+process.argv[2]+'/'+url, process.argv[3]);
    // 控制转换频率
    await sleep(1000);
  }

  await browser.close();
}

main()
