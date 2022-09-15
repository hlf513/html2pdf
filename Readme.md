# HTML2PDF
此项目用于把多个 html 文件转换并合并为一个 pdf 文件。

![html2pdf](html2pdf.svg)

## 安装
```shell
npm install
```
## 使用

1. html 转为 pdf
    ```shell
    node html2pdf.js <html_input_dir> <pdf_out_dir>
    ```
1. 合并 pdf
    ```shell
    node mergepdf.js <pdf_input_dir> <pdf_output_filename>
    ```
1. 添加大纲/目录
    1. 根据 pdf 页码生成目录页码
        ```shell
        node generateOutline.js <pdf_input_dir> > book.toc
        ```
    1. 可以使用 ghostscript，也可使用已封装好的 lib，例如: [pdfoutline](https://github.com/yutayamamoto/pdfoutline)。
