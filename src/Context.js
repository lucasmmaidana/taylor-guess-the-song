import React, { useState, useEffect } from "react"

const Context = React.createContext()

function ContextProvider({ children }) {
  const [gameState, setGameState] = useState("Home")

  const [albums, setAlbums] = useState([])
  const [selectedAlbumId, setSelectedAlbumId] = useState(null)
  const [selectedAlbumName, setSelectedAlbumName] = useState(null)

  const [songs, setSongs] = useState([])
  const [options, setOptions] = useState([])
  const [lyrics, setLyrics] = useState("")

  const [roundCount, setRoundCount] = useState(1)
  const [correctCount, setCorrectCount] = useState(0)

  const ROUNDS = 5

  function startGame(album) {
    setGameState("Quizz")
    setSelectedAlbumId(album.idAlbum)
    setSelectedAlbumName(album.strAlbum)
  }

  /* Get albums when mounted */
  useEffect(() => {
    fetch(
      `https://www.theaudiodb.com/api/v1/json/1/searchalbum.php?s=taylor_swift`
    )
      .then((res) => res.json())
      .then((data) => setAlbums(data.album))
  }, [])

  /* Get songs when an album is selected */
  useEffect(() => {
    selectedAlbumId &&
      fetch(
        `https://theaudiodb.com/api/v1/json/1/track.php?m=${selectedAlbumId}`
      )
        .then((res) => res.json())
        .then((data) => setSongs(data.track))
  }, [selectedAlbumId])

  /* Get random options when songs are fetched */
  useEffect(() => {
    console.log("starts randomOptions ", songs)
    if (songs.length > 0) {
      console.log("redner songs 3", songs)
      var randoms = []
      for (var i = 0; i < 3; i++) {
        randoms.push(Math.floor(Math.random() * songs.length) + 0)
      }
      setOptions([
        { song: songs[randoms[0]].strTrack, correct: true },
        { song: songs[randoms[1]].strTrack, correct: false },
        { song: songs[randoms[2]].strTrack, correct: false },
      ])
      setOptions((prev) => {
        const shuffled = prev
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        return shuffled
      })

      console.log(
        "options",
        options,
        "la correcta ",
        options.filter((opt) => opt.correct)
      )
    }
  }, [songs, roundCount])

  /* Get random lyrics from the correct song */
  useEffect(() => {
    if (options.length > 0) {
      const fetchLyrics = async () => {
        const correctSong = options
          .filter((opt) => opt.correct)[0]
          .song.split(" ")
          .join("_")
        console.log("correcta", correctSong)
        const url = `https://api.lyrics.ovh/v1/Taylor_Swift/${correctSong}`
        try {
          const res = await fetch(url)
          const data = await res.json()
          let lyricsPhrases = data.lyrics
          lyricsPhrases = lyricsPhrases
            .split("\n")
            .filter((line) => line !== "")
          console.log(lyricsPhrases)
          const randomLine = Math.floor(
            Math.random() * (lyricsPhrases.length - 1) + 1
          )
          console.log(
            "line ",
            randomLine,
            " line1 ",
            lyricsPhrases[randomLine],
            " line2 ",
            lyricsPhrases[randomLine + 1]
          )
          setLyrics([lyricsPhrases[randomLine], lyricsPhrases[randomLine + 1]])
          console.log("laslyric", lyrics)
        } catch (err) {
          console.error(err)
        }
      }
      fetchLyrics()
    }
  }, [options])

  function correctAnswer() {
    alert("Yay! Correct")
    nextRound()
    setCorrectCount((prev) => prev + 1)
  }
  function incorrectAnswer() {
    alert("Incorrect :(")
    nextRound()
  }

  function nextRound() {
    roundCount < ROUNDS ? setRoundCount((prev) => prev + 1) : gameOver()
    console.log(roundCount)
  }
  function gameOver() {
    setGameState("Over")
    setSelectedAlbumId(null)
  }

  function restartGame() {
    setGameState("Home")
    setSongs([])
    setOptions([])
    setLyrics("")
    setRoundCount(1)
    setCorrectCount(0)
  }

  return (
    <Context.Provider
      value={{
        startGame,
        gameState,
        setGameState,
        albums,
        setAlbums,
        selectedAlbumId,
        setSelectedAlbumId,
        selectedAlbumName,
        songs,
        setSongs,
        options,
        setOptions,
        lyrics,
        setLyrics,
        correctAnswer,
        incorrectAnswer,
        restartGame,
        roundCount,
        ROUNDS,
        correctCount,
        gameOver,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }
