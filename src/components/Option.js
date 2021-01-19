import React from "react"

function Option({
  song,
  answeredCorrect,
  answeredIncorrect,
  isDisabled,
  isAnswered,
  selectedOption,
}) {
  const answeredState = () => {
    if (isAnswered) {
      if (song.correct) {
        return "correct"
      }
      if (song.song == selectedOption) {
        return "incorrect"
      } else {
        return "disabled"
      }
    }
  }

  return (
    <button
      onClick={() => {
        song.correct ? answeredCorrect(song.song) : answeredIncorrect(song.song)
      }}
      className={`option ${answeredState()}`}
      disabled={isDisabled}
    >
      {song.song}
    </button>
  )
}

export default Option
