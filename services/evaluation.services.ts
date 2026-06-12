import { Evaluation } from "../app/instituteEvaluation/types/evaluationTypes";

const API_URL = "http://localhost:8000/api/evaluations";

export const getEvaluations = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error fetching evaluations");
  return res.json();
};

export const createEvaluation = async (evaluation: Evaluation) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(evaluation),
  });
  if (!res.ok) throw new Error("Error creating evaluation");
  return res.json();
};
