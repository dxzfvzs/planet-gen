export type StoryTest = {
  id: string;
  meta?: string;
  title: string;
  content: string[];
  options: string[];
  scoring: { passThreshold: number };
};