import React, { useMemo, useState } from 'react'

const Test = () => {
    const [con1,setCon1]=useState(1)
    const [con2,setCon2]=useState(10)
    const [even,setEven]=useState()
    const handleClick1=()=>{
        setCon1(con1+1)
        console.log('1')
    }
    const handleClick2=()=>{
        setCon2(con2+1)
        console.log('2')
    }
    const isEven=useMemo(()=>{
        console.log(con1)
        return con1%2==0
    },[con1])
  return (
    <div>
        <div>{isEven?'even':'odd'}</div>
    <button onClick={handleClick1}>clicked {con1}</button>
    <button onClick={handleClick2}>clicked {con2}</button>
    </div>
  )
}

export default Test