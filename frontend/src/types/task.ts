export interface Task {
  id: number;
  title: string;
  description: string;
  typeId: number | null;
  priority: number;
  deadline: string;
}