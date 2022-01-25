import { Grid } from '@mui/material';
import React from 'react';
import { TProject } from '../../../api/projects';
import useScreenSize from '../../../hooks/useScreenSize';
import ProjectCard from './ProjectCard';

type TProps = {
    projects: TProject[];
}

const ProjectsList: React.FC<TProps> = ({ projects }) => {
    const { isMobile } = useScreenSize();

    const sx: { maxWidth?: number, width?: string } = {};
    if(isMobile) {
        sx.maxWidth = 400;
    } else {
        sx.width = '100%';
    }


    return (
        <div>
            <Grid container spacing={2}>
                {projects.map(project => (
                    <Grid item key={project.eid} lg={4} md={6} xs={12} sx={sx}> 
                        <ProjectCard project={project}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default ProjectsList;