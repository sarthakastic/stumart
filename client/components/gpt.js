// Native Imports
import React, { useEffect, useState } from 'react'

// Dependency Imports
import axios from 'axios'

// Components Imports
import Text from './text'

const Gpt = (props) => {
  const [gpt, setGpt] = useState('')

  const [load, setLoad] = useState(true) //

  useEffect(() => {
    setGpt(gpt)
  }, [gpt])

  useEffect(() => {
    const userRole = 'user'
    const userContent = props?.content

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: userRole,
          content: userContent,
        },
      ],
    }

    const options = {
      method: 'POST',
      url: 'https://chatgpt-api7.p.rapidapi.com/ask',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_AI_API_KEY,
        'X-RapidAPI-Host': 'chatgpt-api7.p.rapidapi.com',
      },
      data: {
        query: userContent,
      },
    }

    axios
      .request(options)
      .then(function (response) {
        setLoad(false)
        setGpt(response.data.response)
      })
      .catch(function (error) {
        console.error(error, 'gpt error')
      })
  }, [])

  return load ? 'loading' : <Text text={gpt} />
}

export default Gpt
