"use client";
import { useState, useEffect, useMemo, useRef, MutableRefObject } from "react";
import Chatscreen from "@/components/Chatscreen";
import DexTrade from "./dextrade";
import Documentation from "./documentation";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import {
    generateQuestions,
    generateAndRunSQL,
    generatePlotlyFigure,
  } from "@/actions/actions";

interface Type{
anchor: MutableRefObject<null>
}

const STEPS = [
  {
    path: "/",
    component: Chatscreen,
    hideTabs: true,
    requiredProps: [
      "generateQuestions",
      "generateAndRunSQL",
      "generatePlotlyFigure",
    ],
  },
  {
    path: "/dexTrade",
    component: Chatscreen,
    hideTabs: true,
    requiredProps: [
      "generateQuestions",
      "generateAndRunSQL",
      "generatePlotlyFigure",
    ],
  },
  {
    path: "/documentation",
    component: Chatscreen,
    hideTabs: true,
    requiredProps: [
      "generateQuestions",
      "generateAndRunSQL",
      "generatePlotlyFigure",
    ],
  },
];

function ChatController({ anchor }: any) {

  return (
    <>
        <Switch>
          {STEPS.map((step, idx) => (
            <Route key={idx} path={step.path} exact>
              <step.component 
              generateQuestions={generateQuestions}
              generateAndRunSQL={generateAndRunSQL}
              generatePlotlyFigure={generatePlotlyFigure}
              />
            </Route>
          ))}
        </Switch>
    </>
  );
}

export default ChatController;
