import React, {useEffect, useState} from 'react'
import {API_SERVER} from '../config'
import ItemThumbnail from "./ItemThumbnail"

const Gallery = () => {
  const [mediaItems, setMediaItems] = useState([])
  useEffect(() => {fetchMedia()}, [])

  const fetchMedia = async () => {
    let url = `${API_SERVER}/api/images`
    try {
      const response = await fetch(url)
      const data = await response.json()
      setMediaItems(data.items)
    } catch (error) {
      console.error('Error fetching media items:', error)
    }
  }

  return (
    <div className="container mt-3" >
      <div className="row mt-3" style={{display: "inline"}}>
        {mediaItems.map(item => (<ItemThumbnail key={item.filepath} item={item} />))}
      </div>
    </div >
  )
}

export default Gallery
