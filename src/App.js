import { Routes, Route } from "react-router-dom"
import WyLayout from "@/pages/Layout"
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import AuthComponent from "./components/AuthRouter"
import './App.scss'
import Home from '@/pages/Layout/Home'
import Article from '@/pages/Layout/Article'
import Publish from '@/pages/Layout/Publish'
import { HistoryRouter, history } from './utils/history'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
function App () {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <header className="App-header">
          <ConfigProvider locale={zh_CN}>
            <Routes>
              <Route path="/" element={
                <AuthComponent>
                  <WyLayout />
                </AuthComponent>
              }>
                <Route index element={<Home />}></Route>
                <Route path="Article" element={<Article />}></Route>
                <Route path="Publish" element={<Publish />}></Route>
              </Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>

          </ConfigProvider>

        </header>
      </div>
    </HistoryRouter>

  )
}

export default App

