import React, { useState, useRef, useEffect } from "react"
import { thumbnailSrc } from "../utils"

const LazyLoadingThumbnail = ({ item, onClick }) => {
  const [isVisible, setIsVisible] = useState(false)
  const imageRef = useRef(null)
  const src = thumbnailSrc(item.filepath)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      })
    })

    observer.observe(imageRef.current)

    const imref = imageRef.current

    return () => {
      if (imref) {
        observer.unobserve(imref)
      }
    }
  }, [])

  const height = 150
  const width = Math.round(height * (item.width / item.height))

  const style = {
    marginRight: "8px",
    marginBottom: "16px",
    width: `${width}px`,
    height: `${height}px`,
    cursor: "pointer",
  }

  return (
    <img
      style={style}
      ref={imageRef}
      src={isVisible ? src : ""}
      onClick={onClick}
      alt="thumbnail"
    />
  )
}

const TimelineYear = ({ year, mediaItems, startSlideshowFromIndex }) => {
  return (
    <div className="container mt-3">
      <h1>{year}</h1>
      <div className="row mt-3" style={{ display: "inline" }}>
        {mediaItems.map((item, index) => (
          <LazyLoadingThumbnail
            key={item.filepath}
            item={item}
            onClick={() => startSlideshowFromIndex(item.index)}
          />
        ))}
      </div>
    </div>
  )
}

const Timeline = ({ years, mediaItems, startSlideshowFromIndex }) => {
  const yearSections = years.map((year) => {
    const filesInYear = Array.from(
      new Set(
        mediaItems
          .filter((item) => item.datetime)
          .filter((item) => {
            return item.datetime.substring(0, 4) === year.toString()
          }),
      ),
    )
    return (
      <TimelineYear
        key={year}
        year={year}
        mediaItems={filesInYear}
        startSlideshowFromIndex={startSlideshowFromIndex}
      />
    )
  })

  return <div>{yearSections}</div>
}

export default Timeline
