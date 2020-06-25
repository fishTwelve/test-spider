import { fetchData } from './fetch-data';

interface ProcessOptions{}

export async function init(options?: ProcessOptions) {
    let htmlContent = await fetchData();
    
    // start your code here
    // start your code here
    let fs = require('fs');
    let path = require('path');
    const outputPath = path.resolve(__dirname, '../data/output.data');
    const existencePath = path.resolve(__dirname, '../data/existence.data');
    const outputContent = fs.readFileSync(outputPath).toString();
    const existenceContent = fs.readFileSync(existencePath).toString();
    let flag = false;
    // 第一次执行均写入全量的资源号
    if(!outputContent) {
        fs.writeFileSync(outputPath, htmlContent);
        fs.writeFileSync(existencePath, htmlContent);
    }
    // 第二次执行开始，对比获取的数据和已有资源号的内容
    if (existenceContent !== htmlContent) {
        flag = true;
        let res = htmlContent.split('\n').filter(item => {
            return !existenceContent.includes(item)
        });
        fs.writeFileSync(outputPath, res.join('\n'));
        fs.writeFileSync(existencePath, htmlContent);
        console.log(res.join('\n'));
    }

    if (flag) {
        getcha();
        flag = false;
    } else {
        console.log('未能找到！');
    }
}

function getcha() {
    console.log('发现了新增内容！');
}