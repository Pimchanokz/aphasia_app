"use client"; //use Hook
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import useQuiz from '@/app/store';
import { Player } from "@lottiefiles/react-lottie-player";

interface PhraseWordMatch{
  pic: string,
  word: string,
  phrase: string
}

export default function SelectWord() {
  const config = useQuiz(state=>state.config)

  const [preMatchedData, setPreMatchedData] = useState<PhraseWordMatch[]>([]);

  useEffect(() => { //รับค่าจาก url
    const fetchData = async () => {
      const url = `http://localhost:3000/api/selectLV/${config.level}/Easy`;
      const response = await fetch(url);
      const responseData = await response.json();
      const data = responseData.slice(0, 1);
      setPreMatchedData(data);
    };

    fetchData();
  }, []);


  //shuffle
  const shuffleArray = (matchingData: PhraseWordMatch[]) => {
    return matchingData.slice().sort(() => Math.random() -0.5) //สร้าง Array ใหม่ที่สุ่มแล้ว
  };

  const [ShuffleData, setShuffleData] = useState<PhraseWordMatch[]>(shuffleArray(preMatchedData)); //สุ่ม
  const [pairedData, pairedMatchedData] = useState<PhraseWordMatch[]>([]); //เก็บตัวที่คู่กัน
  const [selected, selectedMatch] = useState<PhraseWordMatch | null>(null); //กดเลือก
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [win, setWin] = useState(false);

  //สลับคำตอบ
  const shuffleAnswers = (data: PhraseWordMatch[]) => {
    const shuffledData = [...data];
    for (let i = shuffledData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
    }
    return shuffledData;
  };
  //สุ่ม
  useEffect(() => {
    setShuffleData(shuffleAnswers(preMatchedData));
  }, [preMatchedData]);

  const handleWin = () => {
    // ฟังก์ชันที่จะถูกเรียกจากคอมโพเนนต์ภายนอกเมื่อมีการชนะ
  };

  useEffect(() => {
    if (win) {
      handleWin(); // เรียกฟังก์ชันที่ส่งมาจากคอมโพเนนต์ภายนอก
    }
  }, [win]);

  
  const handlePhraseClick = (match: PhraseWordMatch, isCorrect: boolean = true) => {
    if (selected === null) {
      if (isCorrect && match.word === preMatchedData[0].word) {
        pairedMatchedData(preMatchedData); // เพิ่มทุกคำตอบในพร้อมกัน
        config.score = 10;
        setWrongSelection(null);
        setWin(true); // กำหนดสถานะ win เป็น true ทันที
      } else {
        config.score = 0;
        setWrongSelection(match);
        // setWin(true);
      }
      selectedMatch(match);
    }
  };

  const [wrongSelection, setWrongSelection] = useState<PhraseWordMatch | null>(null);
  const isMatched = (match: PhraseWordMatch) => pairedData.some((pairedMatch) => pairedMatch === match );
//   const win = pairedData.length === preMatchedData.length && preMatchedData.length !== 0;
const [isEven, setIsEven] = useState(true); // หรือ false ก็ได้
useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 2); // สุ่มเลข 0 หรือ 1
    setIsEven(randomNumber === 1); // ถ้าเป็น 1 กำหนด isEven เป็น true ถ้าไม่ใช่ให้เป็น false
  }, []);

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
        <div className='flex justify-center items-center flex-wrap mt-10'>
            {/* {!win && <div className='flex justify-center items-center mb-5'> */}
            <div className="flex flex-col gap-5">
                {preMatchedData.map((match, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <Image
                            src={match.pic}
                            width={200}
                            height={200}
                            alt="Picture of the author"
                        />
                    </div>
                ))
                }
            </div>
            <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-5">
                    {ShuffleData.map((match, index) => (
                        <button
                        className={`w-full rounded-md px-16 py-2 border-2 border-b-4 text-black font-medium
                        ${selected !== null ? "hover:bg-gray-200 hover:border-gray-400 hover:scale-105" : "cursor-not-allowed"}
                        ${isMatched(match) ? "bg-lime-300 border-lime-500" : "bg-white-100 border-gray-200"}
                        ${wrongSelection === match ? "bg-red-400 border-red-600" : ""}
                        `}
                        key={index}
                        onClick={() => {isEven ? handlePhraseClick(match, false) : handlePhraseClick(match)}}
                        >
                        {isEven ? match.phrase : match.word}
                        </button>
                    ))}
                    {ShuffleData.map((match, index) => (
                        <button
                            className={`w-full rounded-md px-16 py-2 border-2 border-b-4 text-black font-medium
                            ${selected !== null ? "hover:bg-gray-200 hover:border-gray-400 hover:scale-105" : "cursor-not-allowed"}
                            ${isMatched(match) ? "bg-lime-300 border-lime-500" : "bg-white-100 border-gray-200"}
                            ${wrongSelection === match ? "bg-red-400 border-red-600" : ""}
                            `}
                            key={index}
                            onClick={() => {isEven ? handlePhraseClick(match) :handlePhraseClick(match, false)}}
                        >
                        {isEven ? match.word : match.phrase}
                        </button>
                    ))}
                </div>
            </div>
            {/* </div>} */}
            {/* {win && <div className='flex flex-col justify-center items-center'>
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
            } */}
        </div>
  )
}
