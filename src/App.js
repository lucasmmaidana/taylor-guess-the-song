import React, {useState, useEffect} from 'react'
import './App.css';

function App() {

  const [albums, setAlbums] = useState([])
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [songs, setSongs] = useState([])
  const [options, setOptions] = useState([])
  const [lyrics, setLyrics] = useState("")

  const noAlbums = ['Greatest Hits', 'Beautiful Eyes', '…Ready for It?', 'The Taylor Swift Megamix', 'Everything Has Changed', 'The 1989 World Tour', 'CMT Crossroads']

  
  function startGame(albumId) {
    console.log('Game started')
    setIsGameStarted(true)
    setSelectedAlbum(albumId)
  }

  useEffect(() => {
    const fetchAlbums = async () => {
              
      const url = `https://www.theaudiodb.com/api/v1/json/1/searchalbum.php?s=taylor_swift`;
      
      try {
          const res = await fetch(url);
          const data  = await res.json();
          setAlbums(data.album);
          console.log(data.album)
      }catch(err){
          console.error(err);
      }
    }
    fetchAlbums()
  },[])

  
  useEffect(() => {
    const fetchSongs = async () => {
      console.log('album:',selectedAlbum)
      const url = `https://theaudiodb.com/api/v1/json/1/track.php?m=${selectedAlbum}`;
      
      try {
          const res = await fetch(url);
          const data  = await res.json();
          setSongs(data.track);
          console.log('redner songs 1',songs)
      }catch(err){
          console.error(err);
      }
    }
    fetchSongs()

  },[selectedAlbum])

  useEffect(() => {
    console.log('redner songs 2',songs)
    if (songs.length > 0) {
    console.log('redner songs 3',songs)
    var randoms = []; 
    for(var i=0;i<3;i++){ 
    randoms.push(Math.floor(Math.random() * songs.length) + 0); 
    }
    setOptions([
      {"song": songs[randoms[0]].strTrack, "correct": true},
      {"song": songs[randoms[1]].strTrack, "correct":false},
      {"song": songs[randoms[2]].strTrack, "correct": false}
    ])
    /*Shuffle options*/
    setOptions( prev => {
      const shuffled = prev
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled
    })

    console.log('options',options,'la correcta ',options.filter(opt => opt.correct))
    }
  },[selectedAlbum,songs])


  useEffect(() => {
    console.log('redner options',options)
    if (options.length > 0) {
      const fetchLyrics = async () => {
        const correctSong = options.filter(opt => opt.correct)[0].song
        console.log('correcta',correctSong)
        const url = `https://api.lyrics.ovh/v1/Taylor_Swift/${correctSong}`;        
        try {
            const res = await fetch(url);
            const data  = await res.json();
            let lyricsPhrases = data.lyrics
            lyricsPhrases = lyricsPhrases.split('\n').filter(line => line !== "")
            console.log(lyricsPhrases)
            const randomLine = Math.floor(Math.random() * (lyricsPhrases.length -1) +1)
            console.log('line ',randomLine, ' line1 ', lyricsPhrases[randomLine], ' line2 ', lyricsPhrases[randomLine+1])
            setLyrics([lyricsPhrases[randomLine],lyricsPhrases[randomLine+1]]);
            console.log('laslyric',lyrics)
        }catch(err){
            console.error(err);
        }
      }
      fetchLyrics()
    }
  },[options])  

  function correctAnswer() {
    alert('Yay! Correct')
    restartGame()
  }
  function incorrectAnswer() {
    alert('Incorrect :(')
    restartGame()
  }
  function restartGame() {
    setIsGameStarted(false)
  }


  if (isGameStarted) {
    console.log(isGameStarted)
    return (
      <>
      <h2>Guess the lyrics</h2>
      <p>{lyrics[0]}<br/>{lyrics[1]}</p>
      <div className="options">
        {options.map(song => (                      
            <button
              key={song.song}
              onClick={() => {song.correct ? correctAnswer() : incorrectAnswer()}}
              className="song--title">{song.song}
            </button>
        ))}
      </div>
      </>
    )
  } else {
    return (
      <div className="App">
        <h2>Select your favorite album</h2>
        <div className="albums-list">
                  {albums.filter(album => !(noAlbums.includes(album.strAlbum))).map(album => (
                      <button onClick={() => startGame(album.idAlbum)} className="card" key={album.idAlbum}>
                          <img className="album--cover"
                              src={album.strAlbumThumb}
                              alt={album.strAlbum + ' cover'}
                              />
                          <div className="album--info">
                            <h3 className="album--title">{album.strAlbum}</h3>
                          </div>

                      </button>
                  ))}
              </div>   

      </div>
    );
  }
}

export default App;
