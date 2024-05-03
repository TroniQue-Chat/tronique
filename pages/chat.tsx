'use client'
import Dashboard from '@/components/Dashboard'
import React from 'react'
import {
    generateQuestions,
    generateAndRunSQL,
    generatePlotlyFigure,
  } from "@/actions/actions";

const Chat: React.FC = () => {
  return (
    <Dashboard
            generateQuestions={generateQuestions}
            generateAndRunSQL={generateAndRunSQL}
            generatePlotlyFigure={generatePlotlyFigure}
          />
  )
}

export default Chat