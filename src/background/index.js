import axios from 'axios'
import translateIcon from '../img/translate-icon.png'
import './index.css';
import MD5 from './md5'

let checkedText = "" //选中的文本
let mouseCoordinate = {
	clientX: '',
	clientY: ''
} //鼠标当前坐标

//获取翻译结果
function getTranslateResult(value){
	const appid = '20220823001316697'
	const key = 'ENt9X0cenQgCd_5aXNuD'
	const salt = (new Date()).getTime()
	const str1 = appid + value + salt + key
	const data = {
		q: value,
		appid: appid,
		salt: salt,
		from: 'auto',
		to: 'zh',
		sign: MD5(str1)
	}
	axios.get('/index/api/trans/vip/translate',{params:data})
		.then((res) =>  {
			document.getElementById('chromeTranslate').innerHTML = `
		<div class="translate-card"
		style="transform: translate(${mouseCoordinate.clientX<200?mouseCoordinate.clientX : mouseCoordinate.clientX-200}px, ${mouseCoordinate.clientY < 50 ? mouseCoordinate.clientY : mouseCoordinate.clientY - 30}px);">
			<span class="translate-card-title">翻译结果：</span><span class="translate-card-value">${res.data.trans_result[0].dst}</span>
		</div>
	`; //翻译卡片
		}).catch((error) => {
		console.log(error);
	})
}

//翻译选中内容
function translateCheckedText () {
	const copyCheckedText = checkedText; //拷贝一份选中的文本
	checkedText = ''
	getTranslateResult(copyCheckedText)
	document.getElementById('chromeTranslate').innerHTML = `<div class="translate-button" style="display: none"></div>`; //清除翻译按钮
}

//新增翻译按钮
function addButton () {
	document.getElementById('chromeTranslate').innerHTML =
		`<img
				class="translate-button"
				src="${translateIcon}"
				style="transform: translate(${mouseCoordinate.clientX}px, ${mouseCoordinate.clientY < 50 ? mouseCoordinate.clientY : mouseCoordinate.clientY - 30}px);">
			`;
}
/**
 * @author: RenLishisan
 * @description: 实时监听鼠标抬起事件
 * @time: 2022/8/23 20:23
 **/
document.querySelector('body').addEventListener('mouseup', function (event) {
	checkedText = window.getSelection().toString(); //选中文本内容
	mouseCoordinate.clientX = event.clientX; //鼠标X坐标
	mouseCoordinate.clientY = event.clientY; //鼠标Y坐标
	if (document.getElementById('chromeTranslate') === null) {
		document.body.insertAdjacentHTML('afterend',
			`<div id="chromeTranslate">
						<div class="translate-button" style="display: none"></div>
				   </div>'`);
	}
	document.getElementById('chromeTranslate').innerHTML = `<div class="translate-button" style="display: none"></div>`; //清除容器内的元素
	// 选中文字时候添加翻译按钮
	if (checkedText) {
		addButton();
	}
	//监听翻译按钮的点击
	document.querySelector('.translate-button').addEventListener('click', translateCheckedText)
	
})
