import { client } from "@/api/client";
import type { Project } from "@/models/project";

export class ProjectService {

    static async getProjects() {
        const response = await client.get<Project[]>('/projects');

        return response.data;
    }

    static async createProject(project: Project) {
        const response = await client.post<Project>('/projects', project);

        return response.data;
    }
}