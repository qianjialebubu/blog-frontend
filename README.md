# 项目开发日志—2021-07-11

```shell
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'这两个文件顺序不能改变
```

el-row 的 display不能是flex

### 问题：适配手机端后，el-pagination区域太宽影响美观

### 解决方案：监控屏幕宽度，改变el-pagination的部分属性

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

### el-row中的图片水平垂直居中

```js
type="flex" align="middle"
```

### 博客系统评论功能的实现

由于后端传来的评论数据是列表的形式，而前端要实现将评论按层级展示，直观地看出评论的回复情况。

同时为了兼顾功能和美观，要将子评论显示级数限定在二级，而三级之后的评论通过显示回复的评论者的名字来找出其父评论。

思路：

1. 通过parent_id的将返回的评论列表转为子树的形式，父子之间通过children属性来关联
2. 将二层之后的子节点转为其父节点的兄弟节点。
3. 将所有子评论按时间顺序排列

列表转换为子树的代码如下：

```js
let parents = this.blog.comments.filter(value => value.parentComment === null).sort((a, b) => {
                return a.createTime.localeCompare(b.createTime)
            })
            let children = this.blog.comments.filter(value => value.parentComment !== null)
            let translator = (parents, children) => {
                parents.forEach(parent => {
                    children.forEach((child, index) => {
                        if (child.parentComment.id === parent.id) {
                            let temp = JSON.parse(JSON.stringify(children))
                            temp.splice(index, 1)
                            translator([child], temp)
                            typeof parent.children != 'undefined' ? parent.children.push(child) : parent.children = [child]
                        }
                    })
                })
            }
translator(parents, children)
```

二级之后子树打平代码如下：

```javascript
let getChildList = (children) => {
    let cds = []
    let dfs = (children) => {
        if (children === undefined) return
        children.forEach((child) => {
            cds.push(child)
            if (child.children === undefined) return
            dfs(child.children)
        })
    }
    dfs(children)
    return cds.sort((a, b) => {
        return a.createTime.localeCompare(b.createTime)
    })
}
parents.forEach((parent) => {
    parent.children = getChildList(parent.children)
})
```

