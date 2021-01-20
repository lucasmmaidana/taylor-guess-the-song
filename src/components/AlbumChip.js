import React, { useContext } from "react"

import { Context } from "../Context"

function AlbumChip() {
  const { selectedAlbum } = useContext(Context)

  return (
    <div className="album-chip">
      <img
        className="album-thumbnail"
        src={selectedAlbum.imgUrl}
        alt={selectedAlbum.name + " cover"}
        width="2.1em"
        height="2.1em"
      />
      <h3 className="album--title">{selectedAlbum.name}</h3>
    </div>
  )
}

export default AlbumChip
