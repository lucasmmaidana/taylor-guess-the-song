import React, { useContext } from "react"
import Exit from "../components/Exit"
import AlbumChip from "../components/AlbumChip"

import { Context } from "../Context"

function Over() {
  const { restartGame, correctCount, ROUNDS } = useContext(Context)

  return (
    <div className="over main-container">
      <div>
        <Exit />
        <header>
          <AlbumChip />
        </header>
        <h1>You did great!</h1>
        <h2>
          You guessed{" "}
          <mark>
            {correctCount} / {ROUNDS}
          </mark>{" "}
          songs.
        </h2>
      </div>
      <button className="button-primary" onClick={() => restartGame()}>
        Start again
      </button>
    </div>
  )
}

export default Over
