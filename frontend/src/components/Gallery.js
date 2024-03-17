import React, {useEffect, useState} from 'react'
import {API_SERVER} from '../config'
import {stringToHex} from '../utils'
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"

const Gallery = () => {
  const [mediaItems, setMediaItems] = useState([])

  useEffect(() => {fetchMedia()}, [])

  const getUrl = item => {
    const hex = stringToHex(item.filepath)
    return `${API_SERVER}/image/${hex}`
  }

  const fetchMedia = async () => {
    let url = `${API_SERVER}/api/images`
    try {
      const response = await fetch(url)
      const data = await response.json()
      const indexedItems = data.items.map((item, index) => {
        return {
          ...item,
          index,
          original: getUrl(item),
          thumbnail: getUrl(item),
        }
      })
      setMediaItems(indexedItems)
    } catch (error) {
      console.error('Error fetching media items:', error)
    }
  }

  return (
    <ImageGallery items={mediaItems} />
  )

}

export default Gallery
