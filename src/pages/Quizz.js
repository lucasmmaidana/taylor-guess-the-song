import React, { useContext } from "react"

import { Context } from "../Context"

import Lyrics from "../components/Lyrics"
import Option from "../components/Option"
import Exit from "../components/Exit"
import AlbumChip from "../components/AlbumChip"
import Round from "../components/Round"

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
    <div className="quizz main-container">
      <div>
        <Exit />
        <header>
          <AlbumChip />
          <Round actual={roundCount} total={ROUNDS} />
        </header>
        <Lyrics lines={lyrics} />
      </div>
      <div class="options-container">
        <h3>Guess the song</h3>
        <div className="options">
          {options.map((song) => (
            <Option key={song.song} song={song} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Quizz
