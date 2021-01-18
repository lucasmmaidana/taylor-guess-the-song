import React from "react"

function Lyrics({ lines }) {
  return (
    <p className="lyrics">
      {lines[0]}
      <br />
      {lines[1]}
    </p>
  )
}

export default Lyrics
