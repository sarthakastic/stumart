import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Text from './text'

const Gpt = (props) => {
  console.log(process.env.NEXT_PUBLIC_AI_API_KEY, 'ai key')
  const [gpt, setGpt] = useState('')
  const [load, setLoad] = useState(true)

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
      url: 'https://openai80.p.rapidapi.com/chat/completions',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_AI_API_KEY,
        'X-RapidAPI-Host': 'openai80.p.rapidapi.com',
      },
      data: data,
    }

    axios
      .request(options)
      .then(function (response) {
        console.log(response, 'gpt response')
        console.log(response.data.choices[0].message.content)
        setLoad(false)
        setGpt(response.data.choices[0].message.content)
      })
      .catch(function (error) {
        console.error(error, 'gpt error')
      })
  }, [])

  return load ? 'loading' : <Text text={gpt} />
}

export default Gpt
