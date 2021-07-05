// module.exports = {
//     // 代理服务器
//     devServer: {
//         proxy: {
//             // 配置第一个服务器地址'
//             '/blog': {
//                 //字段 /api/one 可以自行修改，但是请求数据时，在请求路径上记得要保持一致，请求配置中有写明，请仔细阅读
//                 target: '',//这里填写服务器地址，后台会给你提供
//                 changeOrigin: true,//配置接口跨域
//                 pathRewrite: {
//                     '^/blog': 'http://localhost:8090'
//                     //重写请求地址
//                 }
//             },
//             //配置第二个服务器地址
//             '/picture': {
//                 target: '',
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '^/pictures': 'http://hikari.top/pic_server'
//                 }
//             },
//         }
//     }
// }
