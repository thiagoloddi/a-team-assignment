import { Container } from '@mui/material';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchProjects, TProject, updateProjects } from '../../../api/projects';
import { add, copyOriginalValues, set, toggleEditMode, resetChanges } from '../../../redux/slices/projectsSlice';
import { RootState } from '../../../redux/store';
import ActionButton from '../../shared/buttons/ActionButton';
import SearchBar from '../../shared/inputs/SearchBar';
import ProjectsList from './ProjectsList';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CloseIcon from '@mui/icons-material/Close';

const StyledProjects = styled.div`
    margin-top: 50px;
    img.banner {
        width: 100%;
        height: 150px;
        object-fit: cover;
    }

    .MuiContainer-root {
        position: relative;
        padding-top: 50px;
        > img.logo {
            width: 80px;
            height: 80px;
            position: absolute;
            top: -60px;
        }
    }

    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 24px;

        .actions {
            display: flex;
            flex-direction: row;

            > * {
                margin-left: 12px;
            }
        }
    }
`;

const Projects: React.FC = () => {
    const projects = useSelector<RootState, TProject[]>((state) => state.projects.projects);
    const isEditMode = useSelector<RootState, boolean>((state) => state.projects.isEditMode);
    const searchTerm = useSelector<RootState, string>((state) => state.projects.searchTerm);
    const dispatch = useDispatch();
    
    const fetchData = useCallback(async () => {
        const data = await fetchProjects();
        dispatch(set(data));
    }, [dispatch])

    const handleEditModeClick = useCallback(() => {
        dispatch(copyOriginalValues())
        dispatch(toggleEditMode());
    }, [dispatch]);

    const handleDiscardChangesClick = useCallback(() => {
        dispatch(resetChanges());
        dispatch(toggleEditMode());
    }, [dispatch]);

    const handleSaveChangesClick = useCallback(async () => {
        await updateProjects(projects);
        dispatch(toggleEditMode());
    }, [dispatch, projects])

    const handleAddProjectClick = useCallback(() => {
        if(!isEditMode) {
            dispatch(toggleEditMode());
        }
        dispatch(copyOriginalValues())
        dispatch(add({
            eid: (Math.random() * 1E5).toFixed(0),
            type: "project",
            title: "",
            jobRole: "",
            description: "",
        }))
    }, [isEditMode, dispatch]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const filteredProjects = useMemo(
        () => projects.filter(project => project.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1), 
        [projects, searchTerm]
    );

    return (
        <StyledProjects>
            <SearchBar placeholder="Search Projects" />
            <img className="banner" src="/projects-banner.jpeg" alt="banner"/>
            <Container>
                <img className="logo" src="/a-team-logo-1.svg"  alt="logo"/>
                <div className="header">
                    <h1>Projects</h1>
                    <div className="actions">
                        {
                            isEditMode ? 
                                <>
                                   <ActionButton icon={<SaveAltIcon />} label="Save Changes" onClick={handleSaveChangesClick} />
                                   <ActionButton icon={<CloseIcon />} label="Discard Changes" onClick={handleDiscardChangesClick} />
                                </> : 
                                <ActionButton icon={<EditIcon />} label="Edit Projects" onClick={handleEditModeClick}/>
                        }
                        <ActionButton icon={<AddIcon />} label="Add Project" onClick={handleAddProjectClick}/>
                    </div>
                </div>
                <ProjectsList projects={filteredProjects}/>
            </Container>
        </StyledProjects>
    );
}

export default Projects;