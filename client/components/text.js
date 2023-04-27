import React, { useRef, useState } from 'react'
import Button from './PredDefinedComponents/Button'

const CopyTextWithButton = (props) => {
  const textRef = useRef(null)
  const [copied, setCopied] = useState(false)

  const handleCopyClick = () => {
    // Select the text inside the div element
    textRef.current.select()
    textRef.current.setSelectionRange(0, 99999)

    // Copy the selected text to the clipboard
    document.execCommand('copy')

    // Deselect the text
    window.getSelection().removeAllRanges()

    // Update the copied state to true
    setCopied(true)

    // Reset the copied state after 3 seconds
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  return (
    <div>
      <div className="flex justify-center items-center ">
        <textarea
          ref={textRef}
          value={props?.text}
          readOnly
          style={{ opacity: 0, position: 'absolute', top: '-9999px' }}
        />
        <p className="border-2 border-gray-400 rounded-2xl m-2 p-1 text-gray-400 placeholder-gray-400 w-full ">
          {props?.text}
        </p>
        <Button
          onClick={handleCopyClick}
          content={copied ? <p>Copied!</p> : <p>Copy</p>}
        />
      </div>
    </div>
  )
}

export default CopyTextWithButton
