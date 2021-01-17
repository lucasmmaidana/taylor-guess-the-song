import React, { useContext } from "react"

import { Context } from "../Context"

function Over() {
  const { restartGame, correctCount, ROUNDS } = useContext(Context)

  return (
    <div className="over">
      <h2>You did great!</h2>
      <p>
        You guessed {correctCount} / {ROUNDS}
      </p>
      <button onClick={() => restartGame()}>Start again</button>
    </div>
  )
}

export default Over
