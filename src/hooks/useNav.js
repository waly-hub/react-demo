import { useNavigate } from 'react-router-dom'
function useNav (path) {
  const navigate = useNavigate()
  navigate(path)
}

export default useNav

// import { useNavigate } from 'react-router-dom'
// function useNav () {
//   const Navigate = useNavigate()

//   Navigate((Location.state) ?? '/', {
//     replace: true,
//   })
// }
// export default useNav
