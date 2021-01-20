import React, { useContext } from "react"

import { Context } from "../Context"

function AlbumCard({ album }) {
  const { startGame } = useContext(Context)

  return (
    <button className="album-card" onClick={() => startGame(album)}>
      <div className="image-container">
        <img className="album-cover-shadow" src={album.strAlbumThumb} alt="" />
        <img
          className="album-cover"
          src={album.strAlbumThumb}
          alt={album.strAlbum + " cover"}
          height="153"
          width="153"
        />
      </div>
      <div className="album--info">
        <h3 className="album--title">{album.strAlbum}</h3>
      </div>
    </button>
  )
}

export default AlbumCard
