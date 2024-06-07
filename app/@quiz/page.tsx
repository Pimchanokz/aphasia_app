"use client"
import PhraseWordSix from "@/components/quizThree/PhraseWordSix";
import { useEffect, useState } from "react";
import useQuiz from "../store";
import PhraseWordTen from "@/components/quizThree/PhraseWordTen";

export default function Quiz() {
    const [questions , setQuestions] = useState([])
    const [answer, setAnswer] = useState('')
    const [loading, setLoading] = useState(false)
    const config = useQuiz(state=>state.config)
    const setScore = useQuiz(state=>state.setScore)
    const {win} = PhraseWordSix();

    useEffect(() => {
      async function getQuestions() {
        const response = await fetch(`http://localhost:3000/api/selectLV/${config.level}/${config.difficulty}`);
        const data = await response.json();
        console.log(data.results);
      }
      getQuestions()
    });

    // const handleNext = () => {
    //   let remainingQuestions = [...questions];
    //   remainingQuestions.shift();
    //   setQuestions([...remainingQuestions]);
    //   setAnswer("");
    // };
    
    return (
      <section className='flex flex-col justify-center items-center'>
        {questions?.length ? (
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Question No{" "}
          <span className="text-blue-600 dark:text-blue-500">
            #{config.numberOfQuestion - questions.length + 1}
          </span>
          .
        </h1>
        ) : null}
        {config.level === 'Level3' && config.difficulty === 'Easy' && (
          <h1 className="mt-10 text-center mb-4 text-xl font-extrabold leading-none tracking-tight text-blueColor md:text-2xl lg:text-3xl">Match a word that matches the pharse on the  left.</h1>
        )}
        {config.level === 'Level3' && config.difficulty === 'Normal' && (
          <h1 className="mt-10 text-center mb-4 text-lg font-extrabold leading-none tracking-tight text-blueColor md:text-xl lg:text-2xl">
            Match the words that express situations with sounds <br/>have corresponding verbs that fit perfectly</h1>
        )}
        {config.level === 'Level3' && config.difficulty === 'Hard' && (
          <h1 className="mt-10 text-center mb-4 text-lg font-extrabold leading-none tracking-tight text-blueColor md:text-xl lg:text-2xl">
            Match the pictures to the words that accurately describe the activity.</h1>
        )}
        {/* <p className="text-base mb-4 leading-none tracking-tight text-black md:text-lg lg:text-xl">Score : {config.score}</p> */}
        <section className="flex flex-col justify-center items-center">
          {config.level === 'Level3' && (config.difficulty === 'Easy' || config.difficulty === 'Normal')&& (
            <div>
              <PhraseWordSix/>
            </div>
          )}
          {config.level === 'Level3' && config.difficulty === 'Hard' && (
            <div>
              <PhraseWordTen/>
            </div>
          )}
            {/* <button 
            onClick={()=> handleNext()}
            type="button" className="w-1/2 outline-none rounded-md my-5 px-6 py-2 border-b-4 border-darkerYellow text-lg text-white font-medium  bg-yellowColor hover:bg-darkerYellow">
              Next
              </button> */}
        </section>
      </section>
    );
    
  }


