"use client";
import { useState, useEffect, useMemo, useRef, MutableRefObject } from "react";
import Sidebar from "@/components/Sidebar";
// import Chatscreen from "@/components/changes";
import { AxiosResponse } from "axios";
import { RUNResponse, SQLResponse, PlotlyFigure } from "@/helpers/types";
import ContextProvider from "@/context/ContextProvider";
// import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import ChatController from "./ChatController";
import { BrowserRouter as Router } from "react-router-dom";
import Chatscreen from "./Chatscreen";

const Dashboard: React.FC = (props) => {
  const anchorRef = useRef(null);
  return (
    <ContextProvider>
      <main className="flex min-h-screen text-lg" ref={anchorRef}>
        <Router basename="/chat">
          <Sidebar />
          <ChatController anchor={anchorRef} />
        </Router>
      </main>
    </ContextProvider>
  );
};

export default Dashboard;
