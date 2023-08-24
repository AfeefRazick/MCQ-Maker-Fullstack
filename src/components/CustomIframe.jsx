/* eslint-disable react/prop-types */
import { useState } from "react"
import { createPortal } from "react-dom"

export const CustomIframe = ({ children, ...props }) => {
  const [contentRef, setContentRef] = useState(null)

  const mountNode = contentRef?.contentWindow?.document?.body
  if (mountNode) {
    mountNode.style = "zoom: "
  }

  // "transform: scale(0.28,0.28) translate(1258px,-865px);width: 1000px;height: 700px;border-radius: 50px;"

  // {
  //   transform: "scale(0.28,0.28)",
  //   translate: "translate(1258px,-865px)",
  //   width: "1000px",
  //   height: "700px",
  //   borderRadius: "50px",
  // }
  console.log(mountNode)
  return (
    <iframe {...props} ref={setContentRef}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  )
}
