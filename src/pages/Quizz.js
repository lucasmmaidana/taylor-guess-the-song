import React, { useContext } from "react"

import { Context } from "../Context"

import AlbumCard from "../components/AlbumCard"
import Lyrics from "../components/Lyrics"
import Option from "../components/Option"

function Quizz() {
  const {
    selectedAlbumId,
    lyrics,
    options,
    correctAnswer,
    incorrectAnswer,
  } = useContext(Context)

  return (
    <div className="home">
      <h2>Guess the song</h2>
      {selectedAlbumId}
      <Lyrics lines={lyrics} />
      <div className="options">
        {options.map((song) => (
          <Option key={song.song} song={song} />
        ))}
      </div>
    </div>
  )
}

export default Quizz
