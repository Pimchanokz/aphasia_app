"use client"; //use Hook
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import useQuiz from '@/app/store';
import { Player } from "@lottiefiles/react-lottie-player";
import { match } from 'assert';

interface PicWordMatch{
  pic: string,
  word: string
}

export default function PhrasePicThree() {
  const config = useQuiz(state=>state.config)
  const [preMatchedData, setPreMatchedData] = useState<PicWordMatch[]>([]);

  useEffect(() => { //รับค่าจาก url
    const fetchData = async () => {
      const url = `http://localhost:3000/api/selectLV/${config.level}/${config.difficulty}`;
      const response = await fetch(url);
      const responseData = await response.json();
      const data = responseData.slice(0, 3);
      setPreMatchedData(data);
    };

    fetchData();
  }, []);

  console.log(preMatchedData)
  //shuffle
  const shuffleArray = (matchingData: PicWordMatch[]) => {
    return matchingData.slice().sort(() => Math.random() -0.5) //สร้าง Array ใหม่ที่สุ่มแล้ว
  };

  const [ShuffleData, setShuffleData] = useState<PicWordMatch[]>(shuffleArray(preMatchedData)); //สุ่ม
  const [pairedData, pairedMatchedData] = useState<PicWordMatch[]>([]); //เก็บตัวที่คู่กัน
  const [selected, selectedMatch] = useState<PicWordMatch | null>(null); //กดเลือก
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);


  //สุ่ม
  useEffect(() => {
    setShuffleData(shuffleArray(preMatchedData));
  }, [preMatchedData]);

  
  const handlePhraseClick = (match: PicWordMatch) => {
    
    if(match === selected){
      const newPairedMatch = [...pairedData, match];
      pairedMatchedData(newPairedMatch);
      config.score = config.score +10
      setWrongSelection(null); // เคลียร์ wrongSelection
    }
    else{
      config.score = config.score -5
      selectedMatch(match); // ตั้งค่า selected เป็น match ที่ผู้ใช้เลือก
      setWrongSelection(match); // ตั้งค่า wrongSelection เป็น match ที่ผู้ใช้เลือกผิด
    }
    console.log(pairedData); []
    selectedMatch(null); //เคลียร์ตัวหลังให้เป็น Null
  };

  const [wrongSelection, setWrongSelection] = useState<PicWordMatch | null>(null);
  const isMatched = (match: PicWordMatch) => pairedData.some((pairedMatch) => pairedMatch === match );
  const win = pairedData.length === preMatchedData.length && preMatchedData.length !== 0;

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    if (win) {
      setEndTime(Date.now());
    }
  }, [win]);

  const duration = endTime && startTime ? (endTime - startTime) / 1000 : null;

  return (
    console.log(config.score),
    <div className='flex justify-center mt-10'>
      {/* {win && <h2 className='absolute text-lime-500'>{config.score}</h2>} */}
      {!win && <div className='grid grid-rows-2 gap-10 mt-5 mb-5'>
      <div className="flex flex-row gap-5">
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
            <Image
            src={match.pic}
            width={200}
            height={200}
            alt="Picture of the author"
            />
          </button>
          ))}
      </div>
      <div className="flex flex-row justify-between gap-5">
        {ShuffleData.map((match, index) => (
          <button 
          className={`w-full h-1/4 rounded-md px-16 py-2 border-2 border-b-4 text-black font-medium 
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
    {win && <div className='flex flex-col justify-center items-center'>
        <Player
          src='https://lottie.host/6918c703-3efd-4bfb-bdf3-e502d93173c6/0ibGlda0q7.json'
          className="player"
          loop
          autoplay
          style={{height: '300px', width: '350px'}}
        />
         <h1 className="mt-0 text-center font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            YOUR SCORE :{" "}
            <span className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {config.score}
            </span>
          </h1>
          <h1 className="mt-0 text-center font-bold text-3xl text-blueColor">
            Time Taken: {`${duration} seconds`}</h1>
        <button 
            onClick={()=> window.location.reload()}
            type="button" className="w-1/2 outline-none rounded-md my-5 px-6 py-2 border-b-4 border-darkerYellow text-lg text-white font-medium  bg-yellowColor hover:bg-darkerYellow">
              Take Another Quiz
              </button>
        
      </div>     
      }
    </div>
  )
}
