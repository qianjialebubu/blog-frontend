<template>
    <div class="com-container">
      <div class="legend-container">
        <!-- 使用 Flex 布局来铺满整个横行 -->
        <el-dropdown @command="onSelectOption">
        <span class="dropdown-trigger">
          选择图例 <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">阅读量</el-dropdown-item>
            <el-dropdown-item command="1">文章数</el-dropdown-item>
            <el-dropdown-item command="2">点赞数</el-dropdown-item>
            <el-dropdown-item command="3">评论数</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
        <div class="com-chart" ref="blog_ref">
        </div>
    </div>
</template>

<script>
export default {
    props: ['psMsg'],
    data() {
        return {
            countByMonth: [],
            commentCountByMonth: [],
            chartInstance: null,
            xAxisData: [],
            seriesData: [],
            timeList: [],
            selectList: ['阅读量','文章数','点赞数','评论数'],
        }
    },
    mounted() {
        //初始化图表
        this.initChart()
        // 得到所有的阅读量
        this.getViewsData()
        // // 得到所有的博客数量
        // this.getBlogData()
        // // 得到所有的点赞数
        // this.getAppreciateCountByMonth()
        // // 得到所有的评论数
        // this.getCommentCountByMonth()
        window.addEventListener('resize', this.screenAdapter)
    },
    watch: {
        'psMsg': {
            handler(value) {
                if (value === 0) {
                    this.getViewsData()
                } else if (value === 1) {
                    this.getBlogData()
                } else if (value === 2) {
                    this.getAppreciateCountByMonth()
                } else if(value === 3){
                    this.getCommentCountByMonth()
                }
            }
        }
    },
    methods: {
      // 点击下拉菜单选项触发的方法
      onSelectOption(command) {
        // 修改 psMsg 的值为选中的选项索引
        // this.psMsg = parseInt(command, 10);
        console.log(command)
        this.psMsg = parseInt(command)
      },
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.blog_ref, this.theme)
            const initOption = {
                backgroundColor: '#FFFFF0',
                legend: {
                    // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
                    orient: 'horizontal',
                    // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
                    x: 'center',
                    // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
                    y: 'top',
                    // data: this.selectList,
                    // data: ['阅读量']
                    data: ['阅读量','文章数','点赞数','评论数']
                },
                //  图表距边框的距离,可选值：'百分比'¦ {number}（单位px）
                grid: {
                    top: '3%',   // 等价于 y: '16%'
                    left: '3%',
                    right: '3%',
                    bottom: '3%',
                    containLabel: true
                },
                // 提示框
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    padding: [5, 10]
                },
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                xAxis: {
                    name: '月份',
                    // name: '周几',
                    type: 'category',
                    // 设置X轴数据旋转倾斜
                    axisLabel: {
                        rotate: 20, // 旋转角度
                        interval: 0  //设置X轴数据间隔几个显示一个，为0表示都显示
                    },
                    // boundaryGap值为false的时候，折线第一个点在y轴上
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    name: '数值',
                    type: 'value',
                },
                series: [
                    {
                      name: '阅读量',
                      data: [820, 932, 301, 1434, 1290, 1330, 1320],
                      type: 'line',
                      // 设置小圆点消失
                      // 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效
                      symbol: 'none',
                      // 设置折线弧度，取值：0-1之间
                      smooth: 0.5,
                      itemStyle: {
                          normal: {
                              color: '#3888fa',
                              lineStyle: {
                                  color: '#3888fa',
                                  width: 2
                              },
                              areaStyle: {
                                  color: '#f3f8ff'
                              }
                          }
                      },
                      animationDuration: 2800,
                      animationEasing: 'cubicInOut'
                  },


                ],
            }
            this.chartInstance.setOption(initOption)
        },
        async getViewsData() {
            const {data: res} = await this.$blog.get('/admin/getViewCountByMonth')
            let list = []
            res.data.forEach((item) => {
                let ls = item.split(',')
                list = list.concat({date: ls[0], views: ls[1]})
            })
            this.countByMonth = list
            // console.log(list)
            this.updateChart()
        },
        async getBlogData() {
            const {data: res} = await this.$blog.get('/admin/getBlogCountByMonth')
            let list = []
            res.data.forEach((item) => {
                let ls = item.split(',')
                list = list.concat({date: ls[0], views: ls[1]})
              // console.log(list)
            })
            // console.log(res.data)
            this.countByMonth = list
            this.updateChart()
        },
        async getAppreciateCountByMonth() {
            const {data: res} = await this.$blog.get('/admin/getAppreciateCountByMonth')
            let list = []
            res.data.forEach((item) => {
                let ls = item.split(',')
                list = list.concat({date: ls[0], views: ls[1]})
            })
            this.countByMonth = list
            console.log(res.data)
            this.updateChart()
        },
        async getCommentCountByMonth() {
            const {data: res} = await this.$blog.get('/admin/getCommentCountByMonth')
            let list = []
            res.data.forEach((item) => {
                let ls = item.split(',')
                list = list.concat({date: ls[0], views: ls[1]})
            })
            this.countByMonth = list
            this.updateChart()
        },
        dateFormat2(originVal) {
            const dt = new Date(originVal)
            const y = dt.getFullYear()
            const m = (dt.getMonth() + 1 + '').padStart(2, '0')

            return `${y}-${m}`
        },
        getTimeList() {
            let time = new Date()
            let month = time.getMonth()
            let year = time.getFullYear()

            let dateList = []
            for (let i = 0; i < 7; i++) {
              const y  = year
              const  m = (month + 1 + '').padStart(2, '0')
              dateList = dateList.concat(`${y}-${m}`)
              // dateList = dateList.concat(this.dateFormat2(time))
              if (month === 0) {
                  month = 11;
                  year = year - 1;
                } else {
                  month = month - 1;
                }
              time.setFullYear(year)
              time.setMonth(month)

            }
            this.timeList = dateList.reverse()
        },
        updateChart() {
            this.getTimeList()
            this.xAxisData = this.timeList
            let sl = []
            for (const item of this.timeList) {
                let a = this.countByMonth.find(i => i.date === item)
                sl = sl.concat(a === undefined ? 0 : a.views)
            }
            this.seriesData = sl
             // console.log(this.selectList[this.psMsg])
            const dataOption = {
                legend: {
                    data: [this.selectList[this.psMsg]]
                    // data: [this.selectList[this.psMsg]]
                },
                xAxis: {
                    data: this.xAxisData
                },

                series: [
                    {
                        name: this.selectList[this.psMsg],
                        data: this.seriesData
                    }
                ]
            }
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter() {
            this.chartInstance.resize()
        },
    }
}
</script>

<style scoped lang="less">
.legend-container {
  display: flex;
  justify-content: left;
  width: 100%;
  background-color:  	#FFFFF0;
}

/* 修改下拉菜单的触发元素样式，让其铺满一行并显示在中央 */
.dropdown-trigger {
  //display: flex;
  //justify-content: center;
  //align-items: center;
  //padding: 10px;
  //border: 1px solid #ccc;
  //border-radius: 4px;
  background-color: 	#FFFFF0;
  width: 100%;
}
    .com-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .com-chart {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    canvas {
        border-radius: 20px;
    }
</style>