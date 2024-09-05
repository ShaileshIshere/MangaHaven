"use client";
import React, { useState, useEffect } from "react";
import {
  MangaBackground,
  mangaBackgroundDataHard,
} from "../data/mangaBackgroundData";
import Image from "next/image";
import { useRecoilState, useRecoilValue } from "recoil";
import { mangaBackgroundData } from "@/state/atoms";
import { getMangaDashboard } from "@/services/api";
import { Skeleton } from "../ui/skeleton";

const BackGroundMain: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  let [items, setItems] = useRecoilState(mangaBackgroundData);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMangaDashboard();
      setItems(data);
    };
    fetchData();
  }, [setItems]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        setIsTransitioning(false);
      }, 800); // Duration of the fade effect
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [items]); // depend on items



  if (items.length <= 1) {
    return <Skeleton className="h-[60vh] mt-5 w-full" />;
  }
  return (
    <div className="flex justify-center items-center overflow-hidden w-full">
      <div className="md:min-h-[60vh] min-h-[45vh] flex justify-center items-center md:px-4 relative md:w-[72vw] w-full">
        <div className="h-full w-full ease-in duration-700 md:p-5 flex flex-col justify-start items-start md:gap-3 gap-2 relative z-10 p-2">
          <h1 className={`md:text-6xl text-2xl font-bold text-[#A977E7] md:w-[150%] w-full transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {items[currentIndex].title}
          </h1>
          <h1 className={`md:w-[150%] w-full md:text-[16px] text-sm transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <span className="md:line-clamp-none line-clamp-3 md:h-[18vh]">
              {items[currentIndex].description}
            </span>
          </h1>
          <div className={`flex flex-wrap gap-2 items-center md:gap-4 transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <button
              style={{ 
                boxShadow: '0 0 1rem rgba(0, 0, 0, 0.5)',
                transition: 'background-color 0.3s ease, transform 0.3s ease'
              }} 
              className="rounded-full md:py-2 md:px-4 p-1 px-2 bg-[#995fff] hover:bg-[#A977E7] md:text-lg text-xs"
            >
              Read Now
            </button>
            <div className='text-white md:opacity-70 md:text-xl text-xs'>
              <span>{items[currentIndex].volume}</span>
              <span className="mx-2">•</span>
              <span>{items[currentIndex].chapter}</span>
            </div>
          </div>
        </div>
        <div className="md:h-[60vh] h-[45vh] w-full darkopacity-[50%] md:w-[200%] absolute md:relative z-0">
          <img
            src={items[currentIndex].imageUrl}
            alt={items[currentIndex].title}
            className={`md:h-[60vh] h-[30vh] w-[200%] object-cover transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
            style={{
              maskImage:
                "linear-gradient(from left, transparent, black, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black, transparent)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BackGroundMain;
