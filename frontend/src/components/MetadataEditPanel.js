import React, { useEffect, useState } from "react"

const MetadataEditPanel = ({item}) => {
  const itemProps = Object.entries(item)
  const propsLiList = itemProps.map(([key, value]) => (
      <li key={key}>
      <strong>{key}:</strong><br /> {value}
      </li>
    ))

  return (
    <div>
    <h2>This is the Edit panel</h2>
    <ul>
      {propsLiList}
    </ul>
    </div>
  )
}

export default MetadataEditPanel
