import React, { useContext } from "react"

function Round({ actual, total }) {
  return (
    <div className="round-counter">
      <span className="actual">{actual}</span>
      <span className="total">{total}</span>
    </div>
  )
}

export default Round
