import { useSearchParams } from 'react-router-dom'
function Pubilsh () {
  const [params] = useSearchParams()
  const id = params.get('id')
  console.log(id)
  return <div>Pubilsh</div>

}

export default Pubilsh