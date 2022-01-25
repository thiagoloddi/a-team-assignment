import data from './mock.json';

export type TProject = {
    eid: string;
    type: string;
    title: string;
    jobRole: string;
    description: string;
    logoURL?: string;
    imageURL?: string;
}

// const wait = async (): Promise<void> => new Promise((resolve) => {
//     setTimeout(resolve, 100);
// });

export const fetchProjects = async (): Promise<TProject[]> => {
    // await wait();
    const storageData = localStorage.getItem("a-team-projects");
    if(storageData) {
        try {
            return JSON.parse(storageData);
        } catch {
            return data;
        }
    }
    
    return data;
}

export const updateProjects = async (projects: TProject[]): Promise<boolean> => {
    // await wait();
    localStorage.setItem("a-team-projects", JSON.stringify(projects));
    return true;
}