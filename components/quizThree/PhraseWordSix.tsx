"use client"; //use Hook
import React, { useEffect, useState } from 'react'
import useQuiz from '@/app/store';

interface PhraseWordMatch{
  phrase: string,
  word: string
}

// const preMatchedData = [
//   {phrase:"氷が", word:"溶ける"},
//   {phrase:"切符を", word:"買う"},
//   {phrase:"長さを", word:"計る"},
//   {phrase:"飛行機に", word:"乗る"},
//   {phrase:"星が", word:"光る"},
//   {phrase:"お茶を", word:"飲む"},
// ]

export default function PhraseWordSix() {
  const config = useQuiz(state=>state.config)

  const [preMatchedData, setPreMatchedData] = useState<PhraseWordMatch[]>([]);

  useEffect(() => { //รับค่าจาก url
    const fetchData = async () => {
      const url = `http://localhost:3000/api/selectLV/${config.level}/${config.difficulty}`;
      const response = await fetch(url);
      const responseData = await response.json();
      const data = responseData.slice(0, 6);
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
    }
    // console.log(pairedData); []
    selectedMatch(null); //เคลียร์ตัวหลังให้เป็น Null
  };

  const isMatched = (match: PhraseWordMatch) => pairedData.some((pairedMatch) => pairedMatch === match );
  const win = pairedData.length === preMatchedData.length;

  return (
    <div className='flex justify-center'>
    {win && <h2 className='absolute text-lime-500'>You win!</h2>}
    <div className='flex justify-center gap-20 mt-5 mb-5'>
      <div className="flex flex-col gap-5">
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
      <div className="flex flex-col gap-5">
        {ShuffleData.map((match, index) => (
          <button 
          className={`rounded-md px-16 py-2 border-2 border-b-4 text-black font-medium 
          ${selected!== null ? "hover:bg-gray-200 hover:border-gray-400 hover:scale-105" : "cursor-not-allowed"} 
          ${isMatched(match) ? "bg-lime-300 border-lime-500" : "bg-white-100 border-gray-200 "}
          `} 
            key={index}
            disabled={selected === null}
            onClick={() => handlePhraseClick(match)}
            >
              {match.word}
          </button>
          ))}
      </div>
    </div>
    </div>
  )
}
