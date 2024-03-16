import React from 'react'
import {API_SERVER} from '../config'
import {useNavigate, useParams} from 'react-router-dom'


const DisplayImage = () => {
  const {hex} = useParams()
  const src = `${API_SERVER}/image/${hex}`
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="container mt-3" >
      <img src={src} alt="" className="img-fluid" onClick={goBack} />
    </div>
  )
}

export default DisplayImage
