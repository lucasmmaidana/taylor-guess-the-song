import React, { useContext } from "react"

import { Context } from "../Context"

import AlbumCard from "../components/AlbumCard"
import Loader from "../components/AlbumsLoader"

function Home() {
  const { ARTIST, albums, isAlbumsLoading } = useContext(Context)

  const mainAlbums = [
    "Fearless",
    "Taylor Swift",
    "Speak Now",
    "Red",
    "1989",
    /* "Reputation",
    "Lover",
    "folklore",
    "evermore", */
  ]

  return (
    <div className="home main-container">
      <header>
        <h1>
          How well do you know <br />
          <mark>{ARTIST}</mark>’s songs?
        </h1>
        <h2>Let's find out!</h2>
      </header>
      <main>
        <h3>Choose your favorite album</h3>
        <div className="albums-list">
          {isAlbumsLoading ? (
            <Loader />
          ) : (
            albums
              .filter((album) => mainAlbums.includes(album.name))
              .map((item) => <AlbumCard key={item.name} album={item} />)
          )}
        </div>
      </main>
    </div>
  )
}

export default Home
