import React, { useContext } from "react"

import { Context } from "../Context"

function Over() {
  const { restartGame } = useContext(Context)

  return (
    <div className="over">
      <h2>You did great!</h2>
      <button onClick={() => restartGame()}>Start again</button>
    </div>
  )
}

export default Over
