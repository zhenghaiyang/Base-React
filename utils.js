const path = require('path')


// 打包的资源路径
exports.assetsPath = function (_path) {
  const assetsSubDirectory = "/static"

  return path.posix.join(assetsSubDirectory, _path)
}

// 把时间戳转换成字符串 带时分秒
exports.timestampToStringHMMS =function(timestamp) {
  let date = new Date(timestamp)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
  let D = (date.getDate()<10) ? "0"+date.getDate() : date.getDate();
  let h = (date.getHours()<10) ? "0"+date.getHours() : date.getHours();
  let mm = (date.getMinutes()<10) ? "0"+date.getMinutes() : date.getMinutes();
  let s = (date.getSeconds()<10) ? "0"+date.getSeconds() : date.getSeconds();
  return Y+M+D+" "+h+":"+mm+":"+s
}

// 把时间戳转换成字符串 不带时分秒
exports.timestampToString =function(timestamp) {
  let date = new Date(timestamp)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
  // let D = date.getDate()
  let D = (date.getDate()<10) ? "0"+date.getDate() : date.getDate();
  return Y+M+D
}




// @font-face {
//   font-family: 'anticon';
//   src: url('https://at.alicdn.com/t/font_148784_v4ggb6wrjmkotj4i.eot');
//   /* IE9*/
//   src: url('https://at.alicdn.com/t/font_148784_v4ggb6wrjmkotj4i.woff') format('woff'),
//   /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
//   url('https://at.alicdn.com/t/font_148784_v4ggb6wrjmkotj4i.ttf') format('truetype'),
//   /* iOS 4.1- */
//    url('https://at.alicdn.com/t/font_148784_v4ggb6wrjmkotj4i.svg#iconfont') format('svg');
// }


// @font-face {
//   font-family: 'anticon';
//   src: url('http://127.0.0.1:8090/static/react/fonts/font_148784_v4ggb6wrjmkotj4i.eot');
//   /* IE9*/
//   src: url('http://127.0.0.1:8090/static/react/fonts/font_148784_v4ggb6wrjmkotj4i.woff') format('woff'),
//   /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
//   url('http://127.0.0.1:8090/static/react/fonts/font_148784_v4ggb6wrjmkotj4i.ttf') format('truetype'),
//   /* iOS 4.1- */
//    url('http://127.0.0.1:8090/static/react/fonts/font_148784_v4ggb6wrjmkotj4i.svg#iconfont') format('svg');
// }


// this.name=9
// var obj={
//   name:10,
//   getname:function(){
//     return this.name * 10
//   }
// }
//
// obj.getname()    // 100
//
//
// var a = obj.getname()
//
// a()   // 90
