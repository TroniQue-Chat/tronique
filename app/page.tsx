import Dashboard from "@/pages/Dashboard";
import { generateQuestions, generateAndRunSQL } from "@/actions/actions";
export default async function Home() {
  return (
    <Dashboard
      generateQuestions={generateQuestions}
      generateAndRunSQL={generateAndRunSQL}
    />
  );
}
