<template>
    <div class="com-container">
        <div class="com-chart" ref="visit_ref">

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            chartInstance:null
        }
    },
    mounted() {
        this.initChart()
        // this.getData()
        // window.addEventListener('resize', this.screenAdapter)
    },
    screenAdapter() {
        this.chartInstance.resize()
    },
    beforeDestroy() {
        if (!this.chartInstance) {
            return
        }
        this.chartInstance.dispose()
        this.chartInstance = null
    },
    methods: {
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.visit_ref, this.theme)
            this.chartInstance.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    top: 10,
                    left: '2%',
                    right: '2%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
                yAxis: [{
                    type: 'value',
                    axisTick: {
                        show: false
                    }
                }],
                series: [{
                    name: '北京',
                    type: 'bar',
                    stack: 'vistors',
                    barWidth: '60%',
                    data: [79, 52, 200, 334, 390, 330, 220],
                }, {
                    name: '上海',
                    type: 'bar',
                    stack: 'vistors',
                    barWidth: '60%',
                    data: [80, 52, 200, 334, 390, 330, 220],
                }, {
                    name: '其他',
                    type: 'bar',
                    stack: 'vistors',
                    barWidth: '60%',
                    data: [30, 52, 200, 334, 390, 330, 220],
                }]
            })
        },
        async getData() {

        }
    }
}
</script>

<style scoped>
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
        border-radius: 0;
    }
</style>