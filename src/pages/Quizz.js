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
  const [selectedOption, setSelectedOption] = useState("")

  const optionsList = options.map((song) => (
    <Option
      key={song.song}
      isAnswered={isAnswered}
      song={song}
      answeredCorrect={answeredCorrect}
      answeredIncorrect={answeredIncorrect}
      selectedOption={selectedOption}
    />
  ))

  function answeredCorrect(selected) {
    setIsAnswered(true)
    setSelectedOption(selected)
    setCorrectCount((prev) => prev + 1)
    setOptionsTitleText("Correct! 😄")
  }
  function answeredIncorrect(selected) {
    setIsAnswered(true)
    setSelectedOption(selected)
    setOptionsTitleText("That's not correct! 😕")
  }

  useEffect(() => {
    setIsAnswered(false)
    setSelectedOption("")
  }, [roundCount])

  useEffect(() => {
    if (!isLyricsLoading) {
      setOptionsTitleText("Guess the song")
    }
  }, [isLyricsLoading])

  const theBottom = useRef(null)
  const scrollToBottom = () => {
    if (isAnswered) {
      setTimeout(() => {
        theBottom.current.scrollIntoView({ behavior: "smooth" })
      }, 150)
    }
  }
  useEffect(scrollToBottom, [isAnswered])

  const NextSongButton = () => {
    return (
      <button className="button-primary" onClick={() => nextRound()}>
        Next song
      </button>
    )
  }

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
      <div className="options-container">
        <h3>{!isLyricsLoading && optionsTitleText}</h3>
        <div className="options">
          {!isLyricsLoading && optionsList}
          <div className={`next-song-container ${isAnswered && "expanded"}`}>
            {isAnswered && <NextSongButton />}
          </div>
          <div ref={theBottom}></div>
        </div>
      </div>
    </div>
  )
}

export default Quizz
