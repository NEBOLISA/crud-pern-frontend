import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import { useThemeStore } from "./store/useThemeStore"
import {Toaster} from "react-hot-toast"
import ProductDetails from "./pages/ProductDetails"
function App() {
 const { theme } = useThemeStore()
  return (
    <div
      data-theme={theme}
      className=' min-h-screen bg-base-200 transition-all duration-300'
    >
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/product-details/:id' element={<ProductDetails />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
