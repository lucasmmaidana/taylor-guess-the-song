import React, { useContext } from "react"

import { Context } from "../Context"
import Loader from "../components/Loader"

function Lyrics({ lines }) {
  const { isLyricsLoading } = useContext(Context)
  console.log("CARGANDO", isLyricsLoading)
  if (isLyricsLoading) {
    return (
      <p className="lyrics">
        <Loader />
      </p>
    )
  } else {
    return (
      <p className="lyrics">
        {lines[0]}
        <br />
        {lines[1]}
      </p>
    )
  }
}

export default Lyrics
