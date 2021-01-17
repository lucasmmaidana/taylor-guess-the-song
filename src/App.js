import React, { useState, useEffect, useContext } from "react"
import "./App.css"

import Home from "./pages/Home"
import Quizz from "./pages/Quizz"
import Over from "./pages/Over"

import { Context } from "./Context"

function App() {
  const { gameState, albums, setAlbums } = useContext(Context)

  const [isGameStarted, setIsGameStarted] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState(null)

  switch (gameState) {
    case "Home":
      return <Home />
    case "Quizz":
      return <Quizz />
    case "Over":
      return <Over />
    default:
      return null
  }
}

export default App
