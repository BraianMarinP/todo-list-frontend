export interface Todo {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    description: string;
    completed: boolean;
}