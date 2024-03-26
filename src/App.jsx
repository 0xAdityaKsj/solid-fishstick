import { useState } from 'react'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import './App.css'
import TdeeCalculator from './TdeeCalculator'
import BarcodeScanner from './BarcodeScanner'
import Home from './Home'
import Test from './test'

function App() {
  return (
    <>

      <BrowserRouter>
        <Home />
        <Test />
        <Routes>
          <Route path='/tdee' element={<TdeeCalculator />} />
          <Route path='/scan' element={<BarcodeScanner />} />
        </Routes>
      </BrowserRouter></>

  )
}
export default App
