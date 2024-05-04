"use client";

import React, { useRef } from "react";
import Dashboard from "@/components/Dashboard";
import {
  generateQuestions,
  generateAndRunSQL,
  generatePlotlyFigure,
} from "@/actions/actions";

function Main() {
  return (
    <>
          <Dashboard
            generateQuestions={generateQuestions}
            generateAndRunSQL={generateAndRunSQL}
            generatePlotlyFigure={generatePlotlyFigure}
          />
    </>
  );
}

export default Main;
