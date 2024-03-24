import { useState } from 'react'
import './App.css'
import TdeeCalculator from './TdeeCalculator'
import BarcodeScanner from './BarcodeScanner'

function App() {


  return (
    <>
      <div>
        <TdeeCalculator />
        <BarcodeScanner />
      </div>
    </>
  )
}

export default App
