"use client";
import { generateAndRunSQL, generatePlotlyFigure, generateQuestions } from '@/actions/actions'
import Chatscreen from '@/components/Chatscreen'
import React from 'react'
import { AxiosResponse } from "axios";
import { RUNResponse, SQLResponse, PlotlyFigure } from "@/helpers/types";
import ContextProvider from "@/context/ContextProvider";

type FunctionProps = {
    generateQuestions: () => Promise<AxiosResponse<any, any>>;
    generateAndRunSQL: (question: string) => Promise<RUNResponse>;
    generatePlotlyFigure: (question: string) => Promise<PlotlyFigure>;
};

function Forum() {
  return (
    <>
        <Chatscreen 
            generateQuestions={generateQuestions} 
            generateAndRunSQL={generateAndRunSQL} 
            generatePlotlyFigure={generatePlotlyFigure} 
        />
    </>
  )
}

export default Forum