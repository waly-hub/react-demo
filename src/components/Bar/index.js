import { useRef, useEffect } from 'react'
import * as echarts from 'echarts'
function Bar ({ options, style }) {
  const barRef = useRef()
  const chartInit = () => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(barRef.current)
    // 绘制图表
    myChart.setOption(options)
  }

  useEffect(() => {
    chartInit()
  })
  return (
    <>
      <div ref={barRef} style={style}></div>
    </>
  )
}

export default Bar