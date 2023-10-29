import React from 'react'

export const Button = (props) => {
  
 


  return (
    <button onClick={props.onClick} className={`bg-blue-400 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded w-24 h-full`}>
      {props.title}
    </button>
  )
}
