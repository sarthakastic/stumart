import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Text from './text'

const Gpt = (props) => {
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
        'X-RapidAPI-Key': '06ddd2d1efmshb02a2d3bd9d6bf4p189be3jsnbc6662e0b6dd',
        'X-RapidAPI-Host': 'openai80.p.rapidapi.com',
      },
      data: data,
    }

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.choices[0].message.content)
        setLoad(false)
        setGpt(response.data.choices[0].message.content)
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [])

  return load ? 'loading' : <Text text={gpt} />
}

export default Gpt
