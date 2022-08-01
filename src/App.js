import { Routes, Route } from "react-router-dom"
import Layout from "@/pages/Layout"
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
function App () {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Layout />}>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </header>
    </div>
  )
}

export default App

