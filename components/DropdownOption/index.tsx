import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export default function DropdownOption() {
  return (
    <section className='flex justify-center items-center py-5 w-full'>
        <div className='px-7 py-4 w-1/2 mx-4' >
            <DropdownMenu>
                <DropdownMenuTrigger className='flex justify-center outline-none  w-full rounded-md px-6 py-2 border-2  border-gray-200 text-black font-medium  bg-white hover:bg-gray-200'>Level</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Select level</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>1</DropdownMenuItem>
                    <DropdownMenuItem>2</DropdownMenuItem>
                    <DropdownMenuItem>3</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div className='px-7 py-4 w-1/2 mx-4' >
            <DropdownMenu>
                <DropdownMenuTrigger className='flex justify-center outline-none  w-full rounded-md px-6 py-2 border-2  border-gray-200 text-black font-medium  bg-white hover:bg-gray-200'>Difficulty</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Select difficulty level</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Easy</DropdownMenuItem>
                    <DropdownMenuItem>Normal</DropdownMenuItem>
                    <DropdownMenuItem>Hard</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </section>
  )
}
