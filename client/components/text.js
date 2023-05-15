// Native Imports
import React, { useRef, useState } from 'react'

// Components Imports
import Button from './PredDefinedComponents/Button'

const CopyTextWithButton = (props) => {
  const textRef = useRef(null)

  const [copied, setCopied] = useState(false) // check if user has copied text or not

  // used to copy text
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
      <div className="flex flex-col justify-center items-center ">
        {/* Display the text we get as prop i.e. the result from the AI */}
        <textarea
          className="w-4/5"
          ref={textRef}
          value={props?.text}
          readOnly
          style={{
            opacity: 0,
            position: 'absolute',
            top: '-9999px',
          }}
        />
        <p className="border-2 border-secondary m-2 p-1 text-secondary placeholder-secondary w-full ">
          {props?.text}
        </p>
        {/* To copy text on clipboard */}
        <Button
          onClick={handleCopyClick}
          content={copied ? <p>Copied!</p> : <p>Copy</p>}
        />
      </div>
    </div>
  )
}

export default CopyTextWithButton
