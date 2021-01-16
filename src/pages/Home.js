import React, { useContext } from "react"

import { Context } from "../Context"

import AlbumCard from "../components/AlbumCard"

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
          .map((item) => (
            <AlbumCard key={item.idAlbum} album={item} />
          ))}
      </div>
    </div>
  )
}

export default Home
