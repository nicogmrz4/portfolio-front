import { ProjectTag } from "./projectTag";

export interface Project {
    id: number,
    name: string,
    description: string,
    preview: string,
    tags: ProjectTag[]
}