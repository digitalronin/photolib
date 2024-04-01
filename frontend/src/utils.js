import { API_SERVER } from "./config"

const imageSrc = (filepath) => {
  const hex = stringToHex(filepath)
  return `${API_SERVER}/image/${hex}`
}

const thumbnailSrc = (filepath) => {
  const hex = stringToHex(filepath)
  return `${API_SERVER}/thumbnail/${hex}`
}

const stringToHex = (inputString) => {
  const textEncoder = new TextEncoder()
  const inputBytes = textEncoder.encode(inputString)
  const hexString = Array.from(inputBytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
  return hexString
}

export { imageSrc, thumbnailSrc, stringToHex }
