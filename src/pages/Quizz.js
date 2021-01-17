import React, { useContext } from "react"

import { Context } from "../Context"

import Lyrics from "../components/Lyrics"
import Option from "../components/Option"

function Quizz() {
  const {
    selectedAlbumId,
    selectedAlbumName,
    lyrics,
    options,
    correctAnswer,
    incorrectAnswer,
    roundCount,
    ROUNDS,
  } = useContext(Context)

  return (
    <div className="home">
      <h2>Guess the song</h2>
      {selectedAlbumName}
      <p>
        {roundCount} / {ROUNDS}
      </p>
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
