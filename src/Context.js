import React, { useState, useEffect } from "react"

const Context = React.createContext()

function ContextProvider({ children }) {
  const [gameState, setGameState] = useState("Home")

  const [albums, setAlbums] = useState([])

  /* Get albums when mounted */
  useEffect(() => {
    fetch(
      `https://www.theaudiodb.com/api/v1/json/1/searchalbum.php?s=taylor_swift`
    )
      .then((res) => res.json())
      .then((data) => setAlbums(data.album))
  }, [])

  return (
    <Context.Provider
      value={{
        gameState,
        setGameState,
        albums,
        setAlbums,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }
