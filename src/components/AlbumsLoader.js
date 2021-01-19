import React from "react"
function AlbumsLoader() {
  var placeholders = []
  for (var i = 0; i < 9; i++) {
    placeholders.push(<div class="album-placeholder"></div>)
  }
  return <>{placeholders}</>
}

export default AlbumsLoader
