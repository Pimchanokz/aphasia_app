import React from 'react'
import Image from 'next/image'

export default function SelectTwo() {
  return (
    <div className='flex justify-center mt-10 gap-20'>
      <div className="flex flex-col gap-5">
            <Image
            src='/images/1.png'
            width={400}
            height={400}
            alt="Picture of the author"
            />
      </div>
      <div className="flex flex-col justify-center gap-10">
          <button 
          className={`w-full h-1/4 rounded-md px-16 py-2 border-2 border-b-4 text-black font-medium` }>
              word
          </button>
          <button 
          className={`w-full h-1/4 rounded-md px-16 py-2 border-2 border-b-4 text-black font-medium` }>
              word
          </button>
      </div>
    </div>
  )
}
