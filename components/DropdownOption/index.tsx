import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    CheckIcon,
    ChevronDownIcon,
    DotFilledIcon,
  } from "@radix-ui/react-icons"
import { useEffect } from 'react'
import useQuiz from '@/app/store'

const Difficulty = ['Easy', 'Normal', 'Hard']
const Level = ['Level1', 'Level2', 'Level3']


export default function DropdownOption() {

    const config = useQuiz(state=>state.config)
    const addLevel = useQuiz(state=>state.addLevel)
    const addDifficulty = useQuiz(state=>state.addDifficulty)

  return (
    <section className='flex justify-center items-center py-5 w-full'>
        <div className='px-7 py-4 w-1/2 mx-4' >
            <DropdownMenu>
                <DropdownMenuTrigger className='flex justify-between items-center outline-none  w-full rounded-md px-6 py-2 border-2  border-gray-200 text-black font-medium  bg-white hover:bg-gray-200'>
                    {config.level?config.level:'Level'}<ChevronDownIcon/></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Select level</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                        Level.map(e=> <DropdownMenuItem onClick={()=>addLevel(e)} key={e}>{e}</DropdownMenuItem>)
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div className='px-7 py-4 w-1/2 mx-4' >
            <DropdownMenu>
                <DropdownMenuTrigger className='flex justify-between items-center outline-none  w-full rounded-md px-6 py-2 border-2  border-gray-200 text-black font-medium  bg-white hover:bg-gray-200'>
                {config.difficulty? config.difficulty:'Difficulty level'}<ChevronDownIcon/></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Select difficulty level</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                        Difficulty.map(e=> <DropdownMenuItem onClick={()=>addDifficulty(e)} key={e}>{e}</DropdownMenuItem>)
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </section>
  )
}
