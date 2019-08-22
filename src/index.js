import printMe from './print.js';
import pay from './payFor.js';
import './style.css'

import wechat from './code/微信收款.jpg';
import alipay from './code/支付宝收款.jpg';


if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

const payPromise = new Promise(function (resolve, reject) {
    var value = pay.IsWeixinOrAlipay();
    console.log(value);

    if (value !== 'false') {
        resolve(value);
    } else {
        var error = "\n 无法识别！ \n"
        reject(error);
    }
});

function component() {
    var element = document.createElement('div');
    var code = document.createElement('div');
    code.innerHTML = "<div class='text'>加载中...<div>";

    payPromise.then((value) => {
        if (value === 'WeChat') {

            //二维码图片
            code.innerHTML = `<div class='text'>长按二维码扫一扫<div><br/><img class = 'img' src = ${wechat}></img>`
        } else if (value === 'Alipay') {
            //window.location.href = "https://qr.alipay.com/fkx03722sfourpfw3kghsd5";
            //location.reload();
            //二维码图片
            code.innerHTML = `<img class = 'img' src = ${alipay}></img>`
        } else {
            code.innerHTML = '未知错误！'
        }
        element.appendChild(code);

    }, (error) => {
        element.innerHTML = [
            "<div class='text'>请使用微信或支付宝扫描二维码.<div>",
            error
        ].join('\n\n');
    });

    return element;
}

let element = component(); // 存储 element，以在 print.js 修改时重新渲染
document.body.appendChild(element);

if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('Accepting the updated printMe module!');
        document.body.removeChild(element);
        element = component(); // Re-render the "component" to update the click handler
        element = component(); // 重新渲染 "component"，以便更新 click 事件处理函数
        document.body.appendChild(element);
    })
}