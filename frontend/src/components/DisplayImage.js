import React from 'react'
import {API_SERVER} from '../config'

const DisplayImage = ({hex, returnToGallery}) => {
  const src = `${API_SERVER}/image/${hex}`

  return (
    <div className="container mt-3" >
      <img src={src} alt="" className="img-fluid" onClick={returnToGallery} />
    </div>
  )
}

export default DisplayImage
