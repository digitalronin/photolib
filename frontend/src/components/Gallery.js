import React, {useEffect, useState} from 'react'
import {API_SERVER} from '../config'
import DisplayImage from "./DisplayImage"
import ItemThumbnail from "./ItemThumbnail"
import {stringToHex} from '../utils'

const Gallery = () => {
  const GALLERY_VIEW = 1
  const DISPLAY_VIEW = 2

  const [viewMode, setViewMode] = useState(GALLERY_VIEW)
  const [mediaItems, setMediaItems] = useState([])
  const [currentItemIndex, setCurrentItemIndex] = useState(0)

  useEffect(() => {fetchMedia()}, [])

  const fetchMedia = async () => {
    let url = `${API_SERVER}/api/images`
    try {
      const response = await fetch(url)
      const data = await response.json()
      const indexedItems = data.items.map((obj, index) => { return { ...obj, index }
});
      setMediaItems(indexedItems)
    } catch (error) {
      console.error('Error fetching media items:', error)
    }
  }

  const clickThumbnail = index => {
    console.log(`Set currentItemIndex to ${index}`)
    setCurrentItemIndex(index)
    setViewMode(DISPLAY_VIEW)
  }

  let imageComponent

  if (viewMode === GALLERY_VIEW) {
    imageComponent = <div className="row mt-3" style={{display: "inline"}}>
      {mediaItems.map(item => (<ItemThumbnail key={item.index} item={item} onClick={() => clickThumbnail(item.index) } />))}
    </div>
  }

  if (viewMode === DISPLAY_VIEW) {
    const item = mediaItems[currentItemIndex]
    const hex = stringToHex(item.filepath)
    imageComponent = <DisplayImage hex={hex} returnToGallery={() => setViewMode(GALLERY_VIEW)}/>
  }

  return (
    <div className="container mt-3" >
      {imageComponent}
    </div >
  )
}

export default Gallery
