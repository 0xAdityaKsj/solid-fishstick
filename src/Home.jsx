import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <nav>
            <ul>
                <li><Link to="/tdee">TDEE Calculator</Link></li>
                <li><Link to="/scan">Barcode Scanner</Link></li>
            </ul>
        </nav>
    )
}