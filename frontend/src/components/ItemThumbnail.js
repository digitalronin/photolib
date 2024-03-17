import React from 'react'
import {imageSrc, stringToHex} from '../utils'

const ItemThumbnail = ({item, onClick}) => {
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
  }

  return (
    <img style={style} src={src} alt="" onClick={onClick} />
  )
}

export default ItemThumbnail
