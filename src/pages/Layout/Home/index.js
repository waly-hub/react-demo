import Bar from '@/components/Bar'
function Home () {
  const option1 = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  }
  return (
    <>
      <h1>Home</h1>
      <Bar options={option1} style={{ width: '500px', height: '400px' }}></Bar>
    </>
  )

}

export default Home