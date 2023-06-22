'use client';

import { Header } from '@/components/header';
import { Inputs } from '@/components/inputs';
import { Today } from '@/components/today';
import { Hourly } from '@/components/hourly';
import { Daily } from '@/components/daily';

import { useState, useEffect } from 'react';

import { useWeather } from '@/hooks/useWeather';

export default function Home() {
  const { daily, today, hourly } = useWeather();

  return (
    <div className="flex justify-center items-center  h-screen ">
      <div className="flex justify-center w-3/5 shadow-lg  h-auto py-10  bg-gradient-to-tl  from-blue-950 to-cyan-600 rounded-lg overflow-hidden">
        <div className="w-3/5 flex flex-col">
          <Header />
          <Inputs />
          <Today data={today} />
          <Hourly data={hourly} />
          <Daily data={daily} />
        </div>
      </div>
    </div>
  );
}
