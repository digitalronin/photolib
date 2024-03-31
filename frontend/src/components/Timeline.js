import React, {useEffect, useState, useParams} from 'react'
import {API_SERVER} from '../config'
import {imageSrc, stringToHex} from '../utils'

const Thumbnail = ({item, onClick}) => {
  const src = imageSrc(item.filepath)
  const hex = stringToHex(item.filepath)
  const link = `image/${hex}`

  const height = 150
  const width = Math.round(height * (item.width/item.height))

  const style = {
    marginRight: "8px",
    marginBottom: "16px",
    width: `${width}px`,
    height: `${height}px`,
    cursor: "pointer",
  }

  return (
    <img style={style} src={src} alt="" onClick={onClick} />
  )
}


const TimelineYear = ({year, mediaItems, startSlideshowFromIndex}) => {
  return (
    <div className="container mt-3" >
      <h1>{year}</h1>
      <div className="row mt-3" style={{display: "inline"}}>
        {mediaItems.map((item, index) =>
          <Thumbnail key={item.filepath} item={item} onClick={() => startSlideshowFromIndex(item.index)} />
        )}
      </div>
    </div>
  )
}

const Timeline = ({years, mediaItems, startSlideshowFromIndex}) => {
  const yearSections = years.map(year => {
    const filesInYear = Array.from(new Set(mediaItems
      .filter(item => item.datetime)
      .filter(item => { return item.datetime.substring(0, 4) === year.toString() })
    ))
    return <TimelineYear key={year} year={year} mediaItems={filesInYear} startSlideshowFromIndex={startSlideshowFromIndex} />
  })

  return (<div>{yearSections}</div>)
}

export default Timeline
