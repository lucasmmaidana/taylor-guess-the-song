import React, { useState, useEffect } from "react"

const Context = React.createContext()

function ContextProvider({ children }) {
  const [gameState, setGameState] = useState("Home")

  const [albums, setAlbums] = useState([])
  const [isAlbumsLoading, setIsAlbumsLoading] = useState(true)
  const [selectedAlbum, setSelectedAlbum] = useState({})

  const [songs, setSongs] = useState([])
  const [options, setOptions] = useState([])
  const [lyrics, setLyrics] = useState("")

  const [roundCount, setRoundCount] = useState(1)
  const [correctCount, setCorrectCount] = useState(0)

  const [retryRandomOptions, setRetryRandomOptions] = useState(0)
  const [isLyricsLoading, setIsLyricsLoading] = useState(true)

  const ARTIST = "Taylor Swift"
  const artistFormated = ARTIST.split(" ").join("_")

  const ROUNDS = 5

  function startGame(album) {
    setGameState("Quizz")
    setSelectedAlbum({
      id: album.mbid,
      name: album.name,
      imgUrl: album.image[0]["#text"],
    })
    console.log("album seleccionado ", album.name)
  }

  const artistId = "06HL4z0CvFAxyc27GXpf02"

  const api_key =
    "BQBRi0ia348QpSshxwPbcT1nEAZCpTDpjgQCdPnx11whTfquD-1DbcYIXDbGCY3uQayzs31XgFOZsgVeBkH0n8JZRRAovB8MO48v_6Ww4UgSQeAMokA8yvStn8WMmHpUtreuRX8q0vDDxClQSg"

  /* Get albums when mounted */
  useEffect(() => {
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=Taylor+Swift&api_key=7cdafb7ded210010decc01f3ba16f18a&format=json`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("albums ", data)
        setAlbums(data.topalbums.album)
        setIsAlbumsLoading(false)
      })
  }, [])

  /* Get songs when an album is selected */
  useEffect(() => {
    if (selectedAlbum.id) {
      const escapedAlbum = selectedAlbum.name.split(" ").join("+")
      console.log("escapado ", escapedAlbum)
      fetch(
        `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=7cdafb7ded210010decc01f3ba16f18a&artist=Taylor+Swift&album=${escapedAlbum}&format=json`
      )
        .then((res) => res.json())
        .then((data) => {
          setSongs(data.album.tracks.track)
          console.log("songs", data.items)
        })
    }
  }, [selectedAlbum])

  /* Get random options when songs are fetched */
  useEffect(() => {
    console.log("starts randomOptions ", songs)
    setIsLyricsLoading(true)

    if (songs.length > 0) {
      var randoms = []
      while (randoms.length < 3) {
        var r = Math.floor(Math.random() * songs.length)
        if (randoms.indexOf(r) === -1) randoms.push(r)
      }

      console.log("RANDOMS ", randoms)

      const initialOptions = [
        { song: songs[randoms[0]].name, correct: true },
        { song: songs[randoms[1]].name, correct: false },
        { song: songs[randoms[2]].name, correct: false },
      ]

      let shuffledOptions = initialOptions
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffledOptions[i], shuffledOptions[j]] = [
          shuffledOptions[j],
          shuffledOptions[i],
        ]
      }

      setOptions(shuffledOptions)

      console.log(
        "options ",
        options,
        "la correcta ",
        options.filter((opt) => opt.correct)
      )
    }
  }, [songs, roundCount, retryRandomOptions])

  /* Get random lyrics from the correct song */
  useEffect(() => {
    if (options.length > 0) {
      setIsLyricsLoading(true)
      const fetchLyrics = async () => {
        const correctSong = options
          .filter((opt) => opt.correct)[0]
          .song.split(" ")
          .join("_")
        console.log("correcta", correctSong)
        const url = `https://api.lyrics.ovh/v1/${artistFormated}/${correctSong}`
        try {
          const res = await fetch(url)
          const data = await res.json()
          let lyricsPhrases = data.lyrics
          if (lyricsPhrases == "") {
            setRetryRandomOptions((prev) => prev + 1)
            console.log("LYRICS VACIAS, REINTENTAR CON NUEVAS OPCIONES")
          } else {
            setIsLyricsLoading(false)
            lyricsPhrases = lyricsPhrases
              .split("\n")
              .filter((line) => line !== "")
            console.log(lyricsPhrases)
            const randomLine = Math.floor(
              Math.random() * (lyricsPhrases.length - 1)
            )
            console.log(
              "line ",
              randomLine,
              " line1 ",
              lyricsPhrases[randomLine],
              " line2 ",
              lyricsPhrases[randomLine + 1]
            )
            setLyrics([
              lyricsPhrases[randomLine],
              lyricsPhrases[randomLine + 1],
            ])
            console.log("laslyric", lyrics)
          }
        } catch (err) {
          console.error(err)
          setRetryRandomOptions((prev) => prev + 1)
        }
      }
      fetchLyrics()
    }
  }, [options])

  function nextRound() {
    roundCount < ROUNDS ? setRoundCount((prev) => prev + 1) : gameOver()
    console.log(roundCount)
  }
  function gameOver() {
    setGameState("Over")
  }

  function restartGame() {
    setGameState("Home")
    setSelectedAlbum({})
    setSongs([])
    setOptions([])
    setLyrics("")
    setRoundCount(1)
    setCorrectCount(0)
  }

  return (
    <Context.Provider
      value={{
        ARTIST,
        startGame,
        gameState,
        setGameState,
        albums,
        setAlbums,
        isAlbumsLoading,
        selectedAlbum,
        songs,
        setSongs,
        options,
        setOptions,
        lyrics,
        setLyrics,
        restartGame,
        nextRound,
        roundCount,
        ROUNDS,
        correctCount,
        setCorrectCount,
        gameOver,
        isLyricsLoading,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }
