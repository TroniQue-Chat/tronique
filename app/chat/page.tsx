import Dashboard from "@/components/Dashboard";
import React from "react";
import {
  generateAndRunSQLForum,
  generateAndRunSQLTrades,
  generatePlotlyFigureTrades,
  generatePlotlyFigureForum,
} from "@/actions/actions";

const Chat: React.FC = () => {
  return <Dashboard />;
};

export default Chat;
