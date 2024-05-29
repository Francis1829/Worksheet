import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Components/Login'
import Todolist from './Components/Todolist'

function App() {
  return (
    <>
    <BrowserRouter>
    <Login />
    </BrowserRouter>
    </>
  )
}

export default App
