# HTML2PDF
# 安装
```shell
npm install --save puppeteer # html 转 pdf
npm install --save pdf-lib # 获取 pdf 页码，也可用于合并 pdf
npm install --save easy-pdf-merge # 合并 pdf
```
# 使用

1. html 转为 pdf
    ```shell
    node html2pdf.js <html_input_dir> <pdf_out_dir>
    ```
1. 合并 pdf
    ```shell
    node mergepdf.js <pdf_input_dir> <pdf_output_filename>
    ```

# 添加大纲/目录
可以使用 ghostscript，也可使用已封装好的 lib，例如: [pdfoutline](https://github.com/yutayamamoto/pdfoutline)。