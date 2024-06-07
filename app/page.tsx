"use client"
import DropdownOption from '@/components/DropdownOption'
import React from 'react'
import Button from '@/components/Button'
import useQuiz from './store'


function Home() {
  const quizConfig = useQuiz(state =>state.config)
  console.log(quizConfig)
  return (
    <section className='flex flex-col justify-center items-center my-10' >
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-blueColor md:text-5xl lg:text-6xl dark:text-primary">Speech Therapy Apps</h1>
      <section className='p-5 my-10 rounded-lg border-2 border-gray-100 shadow-xl w-[50%]'>
        <div className='flex flex-col justify-center items-center'>
          <p> Please select your level</p>
          <DropdownOption/>
          <Button/>
        </div>
      </section>
    </section>
  )
}

export default Home
