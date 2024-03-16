import React from 'react'
import {imageSrc, stringToHex} from '../utils'
import {Link} from 'react-router-dom'

const ItemThumbnail = ({item}) => {
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
    <Link to={link}>
      <img style={style} src={src} alt="" />
    </Link>
  )
}

export default ItemThumbnail
