"use client"
import useQuiz from '@/app/store'
import React from 'react'

export default function Button() {
  const addStatus = useQuiz(state=>state.addStatus)
  return (
    <button type="button" onClick={()=>addStatus('start')} className="w-1/3 outline-none rounded-md px-6 py-2 border-b-4 border-darkerYellow text-lg text-white font-medium  bg-yellowColor hover:bg-darkerYellow">Start</button>
  )
}
