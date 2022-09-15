import { parse } from 'node-html-parser';
import fs  from 'fs'

function main(){
    if (process.argv.length != 4) {
        console.log("error!");
        console.log("usage: node remove_invalid_html.js <pdf_input_dir> <pdf_output_filename>")
        process.exit(-1);
    }

    fs.mkdirSync(process.argv[3],{recursive: true})

    fs.readdirSync(process.argv[2]).forEach(item =>{
        if (item == ".DS_Store"){
            return
        }
        const content = remove_html(parse(fs.readFileSync(process.argv[2]+'/'+item)))
        // todo 新文件名
        item = item.replace('something','')
        fs.writeFileSync(process.argv[3]+"/"+item,content)
        console.log(item)
    })
    console.log("Success")
}

function remove_html(root){
    // 顶栏空白
    root.querySelector('._352wsGxH_0').remove()
    // 顶部菜单
    root.querySelector(".Wz6esVdU_0").remove()
    // 作者
    root.querySelector("._2LbT9q3y_0").remove()
    // 题图
    root.querySelector("._3Jbcj4Iu_0 img").remove()
    // 分割线
    root.querySelector("._2SACi4xg_0").remove()
    // 音频
    if (root.querySelector("._1Bg5E78Y_0") != null){
    	root.querySelector("._1Bg5E78Y_0").innerHTML="<br>"
    	root.querySelector("._1Bg5E78Y_0").setAttribute("class","")
    }
    // 尾图
    const imgs = root.querySelector("._29HP61GA_0").querySelectorAll("p").length
    if (imgs > 1){
        root.querySelector("._29HP61GA_0").querySelectorAll("p").pop().remove()
    }
    // 广告
    root.querySelector("._22WJb59B_0").remove()
    // 上下篇
    root.querySelector("._2DmyW7ex_0").remove()
    // 评论
    root.querySelector("._1qhD3bdE_0").remove()
    // 收藏
    if (root.querySelector("#qb_collection_img_mask") != null) {
        root.querySelector("#qb_collection_img_mask").remove()
    }
    
    return root.toString()
}

main()

