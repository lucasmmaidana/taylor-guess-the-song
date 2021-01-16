import React, { useContext } from "react"

import { Context } from "../Context"

function Home() {
  const { albums, setAlbums } = useContext(Context)

  const noAlbums = [
    "Greatest Hits",
    "Beautiful Eyes",
    "…Ready for It?",
    "The Taylor Swift Megamix",
    "Everything Has Changed",
    "The 1989 World Tour",
    "CMT Crossroads",
  ]

  return (
    <div className="home">
      <h2>Choose your favorite album</h2>
      <div className="albums-list">
        {albums
          .filter((album) => !noAlbums.includes(album.strAlbum))
          .map((album) => (
            <button className="card" key={album.idAlbum}>
              <img
                className="album--cover"
                src={album.strAlbumThumb}
                alt={album.strAlbum + " cover"}
              />
              <div className="album--info">
                <h3 className="album--title">{album.strAlbum}</h3>
              </div>
            </button>
          ))}
      </div>
    </div>
  )
}

export default Home
