import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DateProvider } from './components/Context/DateContext' 
import { DataProvider } from "./components/Context/DataContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider>
    <DateProvider>
    <App />
    </DateProvider>
    </DataProvider>
  </React.StrictMode>,
)
