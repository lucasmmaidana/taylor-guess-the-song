import React, { useRef, useState, useContext, useEffect } from "react"

import { Context } from "../Context"

import Lyrics from "../components/Lyrics"
import Option from "../components/Option"
import Exit from "../components/Exit"
import AlbumChip from "../components/AlbumChip"
import Round from "../components/Round"

function Quizz() {
  const {
    lyrics,
    options,
    nextRound,
    roundCount,
    ROUNDS,
    setCorrectCount,
    isLyricsLoading,
  } = useContext(Context)

  const [optionsTitleText, setOptionsTitleText] = useState("")
  const [isAnswered, setIsAnswered] = useState(false)

  const optionsList = options.map((song) => (
    <Option
      key={song.song}
      isDisabled={isAnswered}
      isAnswered={isAnswered}
      song={song}
      answeredCorrect={answeredCorrect}
      answeredIncorrect={answeredIncorrect}
    />
  ))

  function answeredCorrect() {
    setIsAnswered(true)
    setCorrectCount((prev) => prev + 1)
    setOptionsTitleText("Correct! 😄")
  }
  function answeredIncorrect() {
    setIsAnswered(true)
    setOptionsTitleText("That's not correct! 😕")
  }

  useEffect(() => {
    setIsAnswered(false)
  }, [roundCount])

  useEffect(() => {
    if (!isLyricsLoading) {
      setOptionsTitleText("Guess the lyrics")
    }
  }, [isLyricsLoading])

  const nextSongButton = (
    <button className="button-primary" onClick={() => nextRound()}>
      Next song
    </button>
  )

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
        <h3>{!isLyricsLoading && optionsTitleText}</h3>
        <div className="options">
          {!isLyricsLoading && optionsList}
          {isAnswered && nextSongButton}
        </div>
      </div>
    </div>
  )
}

export default Quizz
