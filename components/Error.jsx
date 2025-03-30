import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError()
  return (
    <div>Something Went Wrong. {error.status}</div>
  )
}

export default Error