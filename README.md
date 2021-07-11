# 项目开发日志—2021-07-11

```shell
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'这两个文件顺序不能改变
```

el-row 的 display不能是flex

## 问题：适配手机端后，el-pagination区域太宽影响美观

### 监控屏幕宽度，改变el-pagination的部分属性
data():

```javascript
screenWidth: document.documentElement.clientWidth,  //实时屏幕宽度
```


watch:

```javascript
'screenWidth':{
    handler (val) {
        if (val<768 && this.pagSmall === false){
            this.pagSmall = true
            this.pagLayout = 'prev, pager, next'
        } else if (val>768 && this.pagSmall === true){
            this.pagSmall = false
            this.pagLayout = 'total, prev, pager, next, jumper'
        }
    }
}
```

created():

```javascript
window.addEventListener('resize', this.screenAdapter)
```

methods:

```javascript
// 屏幕尺寸变化的监听函数
screenAdapter(){
    this.screenWidth = document.documentElement.clientWidth;
}
```



