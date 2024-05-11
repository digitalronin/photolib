import React, { useEffect, useState } from "react"
import { API_SERVER } from "../config"
import { stringToHex } from "../utils"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import Timeline from "./Timeline"
import MetadataEditPanel from "./MetadataEditPanel"

const SLIDESHOW = 1
const TIMELINE = 2

const Gallery = () => {
  const [viewMode, setViewMode] = useState(TIMELINE)
  const [mediaItems, setMediaItems] = useState([])
  const [startIndex, setStartIndex] = useState(0)
  const [showThumbnails, setShowThumbnails] = useState(true)
  const [showMetadataEditPanel, setShowMetadataEditPanel] = useState(true)

  useEffect(() => {
    fetchMedia()
  }, [])

  // Exit slideshow if user presses ESC
  useEffect(() => {
    const ESC = 27
    const handleKeyDown = (event) => {
      console.log("handleKeyDown", event.keyCode)
      if (event.keyCode === ESC) {
        if (viewMode === SLIDESHOW) {
          setViewMode(TIMELINE)
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, []) // Empty dependency array means this effect runs only once after initial render

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
          original: getImageUrl(item, "image"),
          thumbnail: getImageUrl(item, "thumbnail"),
          description: item.datetime,
        }
      })
      setMediaItems(indexedItems)
    } catch (error) {
      console.error("Error fetching media items:", error)
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

  const indexOfFirstItemInYear = (year) => {
    const filteredItems = mediaItems.filter((item) => item.datetime !== null)
    return filteredItems.findIndex((item) => {
      const itemYear = parseInt(item.datetime.substring(0, 4))
      return itemYear === year
    })
  }

  const extractUniqueYears = () => {
    const uniqueYears = Array.from(
      new Set(
        mediaItems
          .filter((item) => item.datetime) // Filter out items where datetime is null
          .map((item) => parseInt(item.datetime.substring(0, 4))), // Extract the year and parse it
      ),
    )
    return uniqueYears
  }

  const startSlideshowFromIndex = (index) => {
    setStartIndex(index)
    setViewMode(SLIDESHOW)
  }

  const years = extractUniqueYears()

  const yearLinks = years.map((year) => {
    return (
      <a
        href="#"
        style={{ marginRight: "8px" }}
        key={year}
        onClick={() => jumpTo(year)}
      >
        {year}
      </a>
    )
  })

  // Return a copy of mediaItems with most values set to {}, and a "window" of "real" items
  // This means ImageGallery doesn't fetch thumbnails for images it's not currently displaying
  const getMostlyFakeItemList = (index) => {
    const windowSize = 10
    return Array.from({ length: mediaItems.length }, (_, i) => {
      return i >= index - windowSize && i < index + windowSize
        ? mediaItems[i]
        : {}
    })
  }

  let content

  if (viewMode === SLIDESHOW) {
    const itemList = getMostlyFakeItemList(startIndex)
    const currentItem = itemList[startIndex]

    let galleryClassName = "col"
    let panelStyle = {display: "none"}

    if (showMetadataEditPanel) {
      galleryClassName = "col-9"
      panelStyle = {}
    }

    content = (
      <div className="row">
        <div className={galleryClassName} id="imageGallery">
          <div className="m-2">
            {yearLinks}
            <span>
              <a href="#" onClick={() => setViewMode(TIMELINE)}>
                Exit slideshow
              </a>
            </span>
          </div>
          <ImageGallery
            items={itemList}
            onScreenChange={toggleFullScreen}
            showThumbnails={showThumbnails}
            startIndex={startIndex}
            onSlide={(index) => setStartIndex(index)} // force a rerender of the ImageGallery so we get more images to display
          />
        </div>
        <div className="col-3 bg-light" style={panelStyle}>
          <MetadataEditPanel item={currentItem} />
        </div>
      </div>
    )
  }

  if (viewMode === TIMELINE) {
    content = (
      <Timeline
        years={years}
        mediaItems={mediaItems}
        startSlideshowFromIndex={startSlideshowFromIndex}
      />
    )
  }

  return content
}

export default Gallery
