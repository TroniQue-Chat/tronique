import React from "react";
import { RUNResponse, TMessage, TQuestions } from "@/helpers/types";
import { v4 as uuidv4 } from "uuid";
import { MESSAGE_TYPES } from "@/helpers/enums";
import { useRoot } from "@/context/ContextProvider";
import "../styles/chatscreen.css";
import { HiOutlineArrowCircleUp } from "react-icons/hi";

type HomescreenProps = {
  questions: TQuestions;
  generateAndRunSQLTrades: (question: string) => Promise<RUNResponse>;
  loading: boolean;
};
const DexTradeHomescreen = (props: HomescreenProps) => {
  const { questions, generateAndRunSQLTrades, loading } = props;

  const fixedQuestions = [
    "What are the month wise total unique transactions?",
    "What are percentage of total unique transactions for 10 smart contract?",
    "Give the hourly total unique transactions of April based on block time.",
    "What are the daily total trades?",
  ];

  const { handleChangeMessageHistory } = useRoot();

  const handleSelectQuestion = async (value: string) => {
    try {
      let newMessage: TMessage = {
        ai: "",
        user: value,
        messageId: uuidv4(),
        type: MESSAGE_TYPES.user,
      };
      handleChangeMessageHistory(newMessage);

      let aiRes = await generateAndRunSQLTrades(value);

      const { df } = aiRes;
      newMessage = {
        ai: df, // Assuming df is the text to display
        user: "",
        messageId: uuidv4(),
        type: MESSAGE_TYPES.df,
      };

      handleChangeMessageHistory(newMessage);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="m-auto flex flex-col w-full h-[100vh] items-center justify-center">
      <div className="flex w-[80%] h-auto flex-col items-start m-3">
        <h3 className="hello-text">Hello, John</h3>

        {<p className="text-[white] paragraph">How can I help you today?</p>}
      </div>
      <div className="flex flex-row justify-start items-start max-h-[54vh] w-[80%]">
        {!loading &&
          fixedQuestions?.map((ques: string) => {
            return (
              <div
                key={uuidv4()}
                className="question-div border border-1 rounded-md py-3 px-4 m-3 text-white flex flex-col justify-between items-center"
              >
                <p className="text-[1vw]">{ques}</p>
                <button
                  className="chat-button"
                  key={uuidv4()}
                  onClick={() => handleSelectQuestion(ques)}
                >
                  <HiOutlineArrowCircleUp className="text-[2.8vw] pt-4" />
                </button>
              </div>
            );
          })}
        {loading && <div className="text-white">Loading....</div>}
      </div>
    </div>
  );
};

export default DexTradeHomescreen;
