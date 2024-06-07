"use client"; //use Hook
import React, { useEffect, useState } from 'react'
import useQuiz from '@/app/store';
import { Player } from "@lottiefiles/react-lottie-player";

interface PhraseWordMatch{
  phrase: string,
  word: string
}

export default function PhraseWordTen() {
  const config = useQuiz(state=>state.config)

  const [preMatchedData, setPreMatchedData] = useState<PhraseWordMatch[]>([]);

  useEffect(() => { //รับค่าจาก url
    const fetchData = async () => {
      const url = `http://localhost:3000/api/selectLV/${config.level}/${config.difficulty}`;
      const response = await fetch(url);
      const responseData = await response.json();
      const data = responseData.slice(0, 10);
      setPreMatchedData(data);
    };

    fetchData();
  }, []);

  console.log(preMatchedData)
  //shuffle
  const shuffleArray = (matchingData: PhraseWordMatch[]) => {
    return matchingData.slice().sort(() => Math.random() -0.5) //สร้าง Array ใหม่ที่สุ่มแล้ว
  };

  const [ShuffleData, setShuffleData] = useState<PhraseWordMatch[]>(shuffleArray(preMatchedData)); //สุ่ม
  const [pairedData, pairedMatchedData] = useState<PhraseWordMatch[]>([]); //เก็บตัวที่คู่กัน
  const [selected, selectedMatch] = useState<PhraseWordMatch | null>(null); //กดเลือก

  //สุ่ม
  useEffect(() => {
    setShuffleData(shuffleArray(preMatchedData));
  }, [preMatchedData]);

  
  const handlePhraseClick = (match: PhraseWordMatch) => {
    
    if(match === selected){
      const newPairedMatch = [...pairedData, match];
      pairedMatchedData(newPairedMatch);
      config.score = config.score +10
      setWrongSelection(null); // เคลียร์ wrongSelection
    }
    else{
      config.score = config.score -1
      selectedMatch(match); // ตั้งค่า selected เป็น match ที่ผู้ใช้เลือก
      setWrongSelection(match); // ตั้งค่า wrongSelection เป็น match ที่ผู้ใช้เลือกผิด
    }
    console.log(pairedData); []
    selectedMatch(null); //เคลียร์ตัวหลังให้เป็น Null
  };

  const [wrongSelection, setWrongSelection] = useState<PhraseWordMatch | null>(null);
  const isMatched = (match: PhraseWordMatch) => pairedData.some((pairedMatch) => pairedMatch === match );
  const win = pairedData.length === preMatchedData.length;

  return (
    console.log(config.score),
    <div className='flex justify-center'>
      {/* {win && <h2 className='absolute text-lime-500'>{config.score}</h2>} */}
      {win && <div className='flex flex-col justify-center items-center'>
        <Player
          src='https://lottie.host/6918c703-3efd-4bfb-bdf3-e502d93173c6/0ibGlda0q7.json'
          className="player"
          loop
          autoplay
          style={{height: '400px', width: '400px'}}
        />
         <h1 className="mt-0 text-center font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            YOUR SCORE :{" "}
            <span className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {config.score}
            </span>
          </h1>
        <button 
            onClick={()=> window.location.reload()}
            type="button" className="w-1/2 outline-none rounded-md my-5 px-6 py-2 border-b-4 border-darkerYellow text-lg text-white font-medium  bg-yellowColor hover:bg-darkerYellow">
              Take Another Quiz
              </button>
      </div>     
      }
      {!win && <div className='flex justify-center items-center gap-20 mt-20 mb-5'>
      <div className="grid grid-cols-2 gap-2">
        {preMatchedData.map((match, index) => (
          <button 
            className={`rounded-md w-full px-12 py-2 border-2 border-b-4 text-black font-medium 
            hover:bg-gray-200 hover:border-gray-400 hover:scale-105
            ${isMatched(match) ? "bg-lime-300 border-lime-500" : "bg-white-100 border-gray-200"}
            ${selected === match && "bg-gray-200 border-gray-400"}
            `}
            key={index}
            onClick={() => selectedMatch(match)} //เลือกโดยการคลิก
            >
              {match.phrase}
          </button>
          ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {ShuffleData.map((match, index) => (
          <button 
          className={`rounded-md px-16 py-2 border-2 border-b-4 text-black font-medium 
          ${selected!== null ? "hover:bg-gray-200 hover:border-gray-400 hover:scale-105" : "cursor-not-allowed"} 
          ${isMatched(match) ? "bg-lime-300 border-lime-500" : "bg-white-100 border-gray-200 "}
          ${wrongSelection === match ? "bg-red-400 border-red-600" : ""}
          `} 
            key={index}
            disabled={selected === null}
            onClick={() => handlePhraseClick(match)}
            >
              {match.word}
          </button>
          ))}
      </div>
    </div>}
    </div>
  )
}
