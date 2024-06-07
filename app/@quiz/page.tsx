"use client"
import PhraseWordSix from "@/components/quizThree/PhraseWordSix";
import { useEffect, useState } from "react";
import useQuiz from "../store";

export default function Quiz() {
    const [questions , setQuestions] = useState([])
    const [answer, setAnswer] = useState('')
    const [loading, setLoading] = useState(false)
    const config = useQuiz(state=>state.config)
    const setScore = useQuiz(state=>state.setScore)

    useEffect(() => {
      async function getQuestions() {
        const response = await fetch(`http://localhost:3000/api/selectLV/${config.level}/${config.difficulty}`);
        const data = await response.json();
        console.log(data.results);
      }
      getQuestions()
    })

    return (
      <section className='flex flex-col justify-center items-center'>
        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-black md:text-4xl lg:text-5xl">Question #1</h1>
        {config.level === '3' && config.difficulty === '1' && (
          <h1 className="text-center mb-4 text-xl font-extrabold leading-none tracking-tight text-blueColor md:text-2xl lg:text-3xl">Match a word that matches the pharse on the  left.</h1>
        )}
        {config.level === '3' && config.difficulty === '2' && (
          <h1 className="text-center mb-4 text-lg font-extrabold leading-none tracking-tight text-blueColor md:text-xl lg:text-2xl">
            Match the words that express situations with sounds <br/>have corresponding verbs that fit perfectly</h1>
        )}
        <p className="text-base mb-4 leading-none tracking-tight text-black md:text-lg lg:text-xl">Score : 0</p>
        <section className="flex flex-col justify-center items-center">
          {config.level === '3' && config.difficulty <= '2' && (
            <div>
              <PhraseWordSix/>
            </div>
          )}
          <button type="button" className="w-1/2 outline-none rounded-md my-5 px-6 py-2 border-b-4 border-darkerYellow text-lg text-white font-medium  bg-yellowColor hover:bg-darkerYellow">Next</button>
        </section>
      </section>
    );
  }


