import React from 'react'
import git from '../../public/git.svg'

const Github = () => {
  return (
    <a
      className="w-full h-full hover:cursor-pointer "
      href="https://github.com/sarthakastic/stumart"
    >
      <img className="w-full" src={git.src} alt="git" />
    </a>
  )
}

export default Github
