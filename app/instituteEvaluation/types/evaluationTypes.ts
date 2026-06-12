export type CriteriaKeys =
  | "presentation"
  | "quality"
  | "mastery"
  | "clarity"
  | "satisfaction";

export type ParametersKeys =
  | "proactivity"
  | "delivery"
  | "compliance"
  | "depth"
  | "objectives"
  | "methodology"
  | "contribution";

export type Student = {
  cedula: string;
  name: string;
  grade: string;
  career: string;
};

export interface Evaluation {
  professorName: string;
  studentId: string;
  criteria: Record<string, number>;
  parameters: Record<string, number>;
  comments: string;
}
