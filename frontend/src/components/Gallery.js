import React, {useEffect, useState} from 'react'
import {API_SERVER} from '../config'
import {stringToHex} from '../utils'
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import Timeline from "./Timeline"

const SLIDESHOW = 1
const TIMELINE  = 2

const Gallery = () => {
  const [viewMode, setViewMode] = useState(TIMELINE)
  const [mediaItems, setMediaItems] = useState([])
  const [startIndex, setStartIndex] = useState(0)
  const [showThumbnails, setShowThumbnails] = useState(true)

  useEffect(() => {fetchMedia()}, [])

  const getImageUrl = (item, docpath) => {
    const hex = stringToHex(item.filepath)
    return `${API_SERVER}/${docpath}/${hex}`
  }

  const fetchMedia = async () => {
    const url = `${API_SERVER}/api/images`
    try {
      const response = await fetch(url)
      const data = await response.json()
      const indexedItems = data.items.map((item, index) => {
        return {
          ...item,
          index,
          original: getImageUrl(item, 'image'),
          thumbnail: getImageUrl(item, 'thumbnail'),
          description: item.datetime,
        }
      })
      setMediaItems(indexedItems)
    } catch (error) {
      console.error('Error fetching media items:', error)
    }
  }

  const toggleFullScreen = () => {
    const showThumbs = showThumbnails
    setShowThumbnails(!showThumbs)
  }

  const jumpTo = (year) => {
    const index = indexOfFirstItemInYear(year)
    setStartIndex(index)
  }

  const indexOfFirstItemInYear = year => {
    const filteredItems = mediaItems.filter(item => item.datetime !== null)
    return filteredItems.findIndex(item => {
      const itemYear = parseInt(item.datetime.substring(0, 4));
      return itemYear === year;
    })
  }

  const extractUniqueYears = () => {
    const uniqueYears = Array.from(new Set(mediaItems
      .filter(item => item.datetime) // Filter out items where datetime is null
      .map(item => parseInt(item.datetime.substring(0, 4))) // Extract the year and parse it
    ))
    return uniqueYears
  }

  const startSlideshowFromIndex = index => {
    setStartIndex(index)
    setViewMode(SLIDESHOW)
  }

  const years = extractUniqueYears()

  const yearLinks = years.map(year => {
    return <a href="#"
              style={{marginRight: "8px"}}
              key={year}
              onClick={() => jumpTo(year)}
           >{year}</a>
  })

  let content

  if (viewMode === SLIDESHOW) {
    content = <div>
      <div className="m-2">
      {yearLinks}
      </div>
      <ImageGallery
        items={mediaItems}
        onScreenChange={toggleFullScreen}
        showThumbnails={showThumbnails}
        lazyLoad={true}
        startIndex={startIndex}
      />
    </div>
  }

  if (viewMode === TIMELINE) {
    content = <Timeline years={years} mediaItems={mediaItems} startSlideshowFromIndex={startSlideshowFromIndex} />
  }

  return content

}

export default Gallery
