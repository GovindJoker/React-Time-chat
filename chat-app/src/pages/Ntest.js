import React, { memo } from 'react'

const Ntest = ({val,fun}) => {
    console.log('testing')
  return (
    <div>Ntest</div>
  )
}

export default memo(Ntest)