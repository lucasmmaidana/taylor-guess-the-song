import React, { useContext } from "react"

import { Context } from "../Context"
import Loader from "../components/LyricsLoader"

function Lyrics({ lines }) {
  const { isLyricsLoading } = useContext(Context)
  console.log("CARGANDO", isLyricsLoading)
  if (isLyricsLoading) {
    return (
      <div className="lyrics">
        <Loader />
      </div>
    )
  } else {
    return (
      <div className="lyrics">
        <p>
          {lines[0]}
          <br />
          {lines[1]}
        </p>
      </div>
    )
  }
}

export default Lyrics
