import React, { useContext } from "react"
import { Context } from "../Context"

function Option({ song }) {
  const { correctAnswer, incorrectAnswer } = useContext(Context)
  return (
    <button
      onClick={() => {
        song.correct ? correctAnswer() : incorrectAnswer()
      }}
      className="song--title"
    >
      {song.song}
    </button>
  )
}

export default Option
