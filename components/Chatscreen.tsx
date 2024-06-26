"use client";
import React, {
  useLayoutEffect,
  useState,
  KeyboardEvent,
  useCallback,
} from "react";
import { BiSend } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import MessageHistory from "./MessageHistory";
import Homescreen from "./Homescreen";
import {
  PlotlyFigure,
  SQLResponse,
  TMessage,
  TQuestions,
  RUNResponse,
} from "@/helpers/types";
import { AxiosResponse } from "axios";
import { MESSAGE_TYPES } from "@/helpers/enums";
import { useRoot } from "@/context/ContextProvider";
import "../styles/chatscreen.css";
import {
  generateAndRunSQLForum,
  generatePlotlyFigureForum,
} from "@/actions/actions";

// type ChatscreenProps = {
//   generateQuestions: () => Promise<AxiosResponse<any, any>>;
//   generateAndRunSQLForum: (question: string) => Promise<RUNResponse>;
//   generatePlotlyFigureForum: (question: string) => Promise<PlotlyFigure>;
// };

const Chatscreen: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const { showSideBar, messageHistory, handleChangeMessageHistory } = useRoot();

  const [disabled, setDisabled] = useState(message.length === 0);
  const [loading, setLoading] = useState(true);
  const [generatedQuestions, setGeneratedQuestions] = useState({});
  const [plotlyResult, setPlotlyResult] = useState<any>();

  useLayoutEffect(() => {
    let isMounted = true; // Flag to track component's mounting status

    // async function fetchData() {
    //   let questions = await generateQuestions();
    //   if (isMounted) {
    //     // Only update state if component is still mounted
    //     console.log({ questions });
    //     setGeneratedQuestions(questions);
    //     setLoading(false);
    //   }
    // }

    // fetchData();
    setLoading(false);
    return () => {
      isMounted = false; // Set flag to false when the component unmounts
    };
  }, []);

  const handleInputChange = (e: { target: { value: string } }) => {
    if (e.target.value.length > 0) {
      setMessage(e.target.value);
      setDisabled(false);
    } else {
      setMessage("");
      setDisabled(true);
    }
  };

  const handleSend = useCallback(async () => {
    if (message.length === 0) return; // Guard clause to prevent sending empty messages

    try {
      const newMessageId = uuidv4();

      const msg = message.slice();
      setMessage("");
      setDisabled(true);
      let newMessage: TMessage = {
        ai: "",
        user: msg,
        messageId: newMessageId,
        type: MESSAGE_TYPES.user,
      };

      handleChangeMessageHistory(newMessage);

      const aiRes = await generateAndRunSQLForum(msg);
      const { df } = aiRes;

      if ("error" in aiRes) {
        newMessage = {
          ai: aiRes?.error as string,
          user: "",
          messageId: uuidv4(),
          type: MESSAGE_TYPES.error,
        };
      } else {
        newMessage = {
          ai: df,
          user: "",
          messageId: uuidv4(),
          type: MESSAGE_TYPES.df,
        };
      }

      handleChangeMessageHistory(newMessage);

      const plotlyRes = await generatePlotlyFigureForum(msg);
      const plotData = JSON.parse(plotlyRes.fig);

      setPlotlyResult(plotData);
      console.log("Vis Result", plotlyRes);
    } catch (error: any) {
      console.error("Failed to handle send:", error);
      // Handle the error state appropriately
    }

    // router.push('/')
  }, [
    message,
    handleChangeMessageHistory,
    generateAndRunSQLForum,
    generatePlotlyFigureForum,
  ]); // Dependencies

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && !disabled) {
      handleSend();
      event.preventDefault(); // Prevent the default action to avoid submitting a form if it's part of one
    }
  };

  return (
    <div className={`chatscreen z-10 ${showSideBar ? "w-[80%]" : "w-[100%]"}`}>
      {messageHistory?.length === 1 ? (
        <Homescreen
          questions={generatedQuestions as TQuestions}
          generateAndRunSQLForum={generateAndRunSQLForum}
          loading={loading}
        />
      ) : (
        <MessageHistory runSQL={generateAndRunSQLForum} plotlyResult={plotlyResult}/>
      )}

      <div
        className={`z-10 fixed bottom-0 pl-10 pr-4 py-2 mt-2 rounded-full m-8 bg-[#231E1E]
        ${showSideBar ? "w-[73vw]" : "w-[85%]"}`}
      >
        <div className={`flex items-center`}>
          <input
            type="text"
            className={`input m-2 w-full bg-transparent border-none outline-none ${
              message.trim() ? "text-white" : "text-[#848484]"
            }`}
            placeholder="Enter a prompt here"
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />

          <button
            disabled={disabled}
            className={`flex items-center justify-center h-9 w-10 border rounded-full bg-white ${
              disabled ? "border-white bg-white" : "border-white bg-white"
            }`}
          >
            <BiSend size={20} onClick={handleSend} className="text-red-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatscreen;
