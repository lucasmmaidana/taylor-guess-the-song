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

  function startGame(albumId) {
    console.log("Game started")
    setIsGameStarted(true)
    setSelectedAlbum(albumId)
  }

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

  {
    /** if (isGameStarted) {
    console.log(isGameStarted)
    return (
      <>
        <h2>Guess the lyrics</h2>
        <p>
          {lyrics[0]}
          <br />
          {lyrics[1]}
        </p>
        <div className="options">
          {options.map((song) => (
            <button
              key={song.song}
              onClick={() => {
                song.correct ? correctAnswer() : incorrectAnswer()
              }}
              className="song--title"
            >
              {song.song}
            </button>
          ))}
        </div>
      </>
    )
  } else {
    return (
      <div className="App">
        <h2>Select your favorite album</h2>
        <div className="albums-list">
          {albums
            .filter((album) => !noAlbums.includes(album.strAlbum))
            .map((album) => (
              <button
                onClick={() => startGame(album.idAlbum)}
                className="card"
                key={album.idAlbum}
              >
                <img
                  className="album--cover"
                  src={album.strAlbumThumb}
                  alt={album.strAlbum + " cover"}
                />
                <div className="album--info">
                  <h3 className="album--title">{album.strAlbum}</h3>
                </div>
              </button>
            ))}
        </div>
      </div>
    )
            **/
  }
}

export default App
