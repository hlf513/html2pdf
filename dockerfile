FROM node:18

RUN apt update 
# 安装 chromium (arm64 需要手动安装) https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md
RUN apt -y install fontconfig xfonts-utils ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release xdg-utils chromium 
RUN apt install -y default-jre 
# 设置中文字符集
RUN apt install -y locales
RUN echo 'zh_CN.UTF-8 UTF-8' >> /etc/locale.gen
RUN locale-gen
ENV LANG=zh_CN.UTF-8
ENV LC_ALL=zh_CN.UTF-8
ENV LC_LANG=zh_CN.UTF-8

# 安装中文字体
ADD MSYH.ttf /usr/share/fonts/ 
RUN mkfontscale && mkfontdir && fc-cache 

RUN mkdir /html2pdf /data /pdfoutline

# 安装 pdfoutline
RUN apt install -y ghostscript
RUN git clone https://github.com/yutayamamoto/pdfoutline.git 
RUN cp /pdfoutline/pdfoutline.py /html2pdf/

ADD . /html2pdf/ 
# RUN npm install

WORKDIR /html2pdf

ENTRYPOINT [ "tail","-f","/dev/null" ]