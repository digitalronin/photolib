import React from 'react'
import imageSrc from '../utils'

const ItemThumbnail = ({item}) => {
  const src = imageSrc({filepath: item.filepath})

  const height = 150
  const width = Math.round(height * (item.width/item.height))

  const style = {
    marginRight: "8px",
    marginBottom: "16px",
    width: `${width}px`,
    height: `${height}px`,
  }

  return (
    <img style={style} src={src} alt="" />
  )
}

export default ItemThumbnail
