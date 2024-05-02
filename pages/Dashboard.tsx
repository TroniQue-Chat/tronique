"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import Chatscreen from "@/components/Chatscreen";
// import Chatscreen from "@/components/changes";
import { AxiosResponse } from "axios";
import { RUNResponse, SQLResponse } from "@/helpers/types";
import ContextProvider from "@/context/ContextProvider";

type FunctionProps = {
  generateQuestions: () => Promise<AxiosResponse<any, any>>;
  generateAndRunSQL: (question: string) => Promise<RUNResponse>;
};

const Dashboard: React.FC<FunctionProps> = (props: FunctionProps) => {
  const { generateQuestions, generateAndRunSQL } = props;

  return (
    <ContextProvider>
      <main className="flex min-h-screen text-lg">
        <Sidebar />
        <Chatscreen
          generateQuestions={generateQuestions}
          generateAndRunSQL={generateAndRunSQL}
        />
      </main>
    </ContextProvider>
  );
};

export default Dashboard;
