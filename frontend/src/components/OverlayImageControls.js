import React from "react"

const OverlayImageControls = ({ infoClick }) => {
  const barHeight = 50
  const iconSize = 30

  const overlayStyle = {
    height: `${barHeight}px`,
    background:
      "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  const onClick = (evt) => {
    evt.stopPropagation()
    return infoClick()
  }

  return (
    <div className="position-relative">
      <div
        className="black-bar position-absolute w-100 pe-none"
        style={overlayStyle}
      >
        <span className="text-white" onClick={onClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={iconSize}
            height={iconSize}
            fill="currentColor"
            className="bi bi-info-square pe-auto"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
          </svg>
        </span>
      </div>
    </div>
  )
}

export default OverlayImageControls
