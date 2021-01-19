import React from "react"

function Option({
  song,
  answeredCorrect,
  answeredIncorrect,
  isDisabled,
  isAnswered,
}) {
  const answeredState = () => {
    if (isAnswered) {
      if (song.correct) {
        return "correct"
      } else {
        return "incorrect"
      }
    }
  }

  return (
    <button
      onClick={() => {
        song.correct ? answeredCorrect() : answeredIncorrect()
      }}
      className={`option ${answeredState()}`}
      disabled={isDisabled}
    >
      {song.song}
    </button>
  )
}

export default Option
