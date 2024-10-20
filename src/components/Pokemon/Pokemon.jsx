import React from 'react'
function Pokemon({name , image }) {
  return (
    <div>
      <div>
        {name}
      </div>
      <div>
        <img src={image} alt='' />
      </div>
    </div>
  )
}

export default Pokemon
