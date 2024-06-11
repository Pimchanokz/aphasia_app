"use client"
import PhraseWordSix from "@/components/quizThree/PhraseWordSix";
import { useEffect, useState } from "react";
import useQuiz from "../store";
import PhraseWordTen from "@/components/quizThree/PhraseWordTen";
import PhrasePicFive from "@/components/quizOne/PhrasePicFive";
import SelectWord from "@/components/quizTwo/SelectWord";

export default function Quiz() {
    const config = useQuiz(state=>state.config)

    useEffect(() => {
      async function getQuestions() {
        const response = await fetch(`http://localhost:3000/api/selectLV/${config.level}/${config.difficulty}`);
        const data = await response.json();
        console.log(data.results);
      }
      getQuestions()
    });
    
    return (
      <section className='flex flex-col justify-center items-center'>
        {config.level === 'Level3' && (config.difficulty === 'Easy' || config.difficulty === 'Normal')&& (
          <h1 className="mt-10 text-center mb-4 text-xl font-extrabold leading-none tracking-tight text-blueColor md:text-2xl lg:text-3xl">
            Match a word that matches the pharse on the  left.</h1>
        )}
        {config.level === 'Level3' && config.difficulty === 'Hard' && (
          <h1 className="mt-10 text-center mb-4 text-lg font-extrabold leading-none tracking-tight text-blueColor md:text-xl lg:text-2xl">
            Match the words that express situations with sounds <br/>have corresponding verbs that fit perfectly</h1>
        )}
        {config.level === 'Level1' && (
          <h1 className="mt-10 text-center mb-4 text-lg font-extrabold leading-none tracking-tight text-blueColor md:text-xl lg:text-2xl">
            Match the pictures to the words <br/>that accurately describe the activity. </h1>
        )}
        {config.level === 'Level2' && (
          <h1 className="mt-10 text-center mb-4 text-lg font-extrabold leading-none tracking-tight text-blueColor md:text-xl lg:text-2xl">
            Match the words (verbs) on the right, <br/>which go with the picture on the left  </h1>
        )}
        {/* <p className="text-base mb-4 leading-none tracking-tight text-black md:text-lg lg:text-xl">Score : {config.score}</p> */}
        <section className="flex flex-col justify-center items-center">
          {/* {config.level === 'Level1' && (config.difficulty === 'Easy' || config.difficulty === 'Normal')&& (
            <div className="flex justify-evenly items-center flex-wrap">
              <PhrasePicThree/>
            </div>
          )} */}
          {config.level === 'Level1' && config.difficulty === 'Easy'&& (
            <div className="grid grid-cols-2 justify-evenly items-center m-10">
              <SelectWord/>
              <SelectWord/>
              <SelectWord/>
              <SelectWord/>
            </div>
          )}
          {config.level === 'Level1' && config.difficulty === 'Hard'&& (
            <div>
              <PhrasePicFive/>
            </div>
          )}
          {config.level === 'Level3' && (config.difficulty === 'Easy' || config.difficulty === 'Hard')&& (
            <div>
              <PhraseWordSix/>
            </div>
          )}
          {config.level === 'Level3' && config.difficulty === 'Normal' && (
            <div>
              <PhraseWordTen/>
            </div>
          )}
        </section>
      </section>
    );
    
  }


