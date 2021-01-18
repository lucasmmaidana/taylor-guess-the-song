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
    <div className="home main-container">
      <header>
        <h1>
          How well do you know <br />
          <mark>Taylor Swift</mark>’s songs?
        </h1>
        <h2>Let's find out!</h2>
      </header>
      <main>
        <h3>Choose your favorite album</h3>
        <div className="albums-list">
          {albums
            .filter((album) => !noAlbums.includes(album.strAlbum))
            .map((item) => (
              <AlbumCard key={item.idAlbum} album={item} />
            ))}
        </div>
      </main>
    </div>
  )
}

export default Home
