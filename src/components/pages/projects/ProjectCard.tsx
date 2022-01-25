import { Card, CardContent, Fab } from '@mui/material';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { TProject } from '../../../api/projects';
import { TAppTheme } from '../../../providers/StyledComponentsThemeProvider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { remove, updateOne } from '../../../redux/slices/projectsSlice';

type TProps = {
    project: TProject;
}

const StyledCard = styled.div`
    position: relative;
    .MuiCardContent-root {
        padding 24px;
        padding-top: 100px;
        position: relative;
        img.background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 64px;
            width: 100%;
            object-fit: cover;
        }
    }

    .MuiFab-root {
        position: absolute;
        background-color: #eee;
        left: 16px;
        top: 30px;
        height: 48px;
        width: 48px;
    }

    .project-title {
        font-size: 20px;
        color: ${({ theme }: { theme: TAppTheme }) => theme.colors.grey1};
        font-weight: 600;
    }

    .project-description {
        margin-top: 20px;
        height: 190px;
        font-size: 14px;
        overflow: scroll;
    }
    .role-wrapper {
        display: flex;
        direction row;
        align-items: center;
        font-size: 14px;
        color: ${({ theme }: { theme: TAppTheme }) => theme.colors.grey1};
        margin-top: 18px;

        .role-icon {
            margin-right: 8px;
        }
    }

    .divider {
        height: 1px;
        width: 100%;
        margin: 24px 0;
        background-color: lightgrey;
    }

    .footer {
        display: inline-flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        .project-avatar {
            height: 24px;
            width: 24px;
            border-radius: 50%;
        }

        .actions > *{
            margin-left: 10px;
        }

    }


    .add-icon {
        position: absolute;
        top: 20px;
        left: 0;
        right: 0;
        margin: auto;
        color: ${({ theme }: { theme: TAppTheme }) => theme.colors.orange1};
    }
`;

const EditableField = styled.input<{ isEditMode?: boolean }>`
    background-color: white;
    border-bottom: 1px dashed ${({ isEditMode }) => isEditMode ? 'rgba(0, 0, 0, 0.2)' : 'transparent'};
    box-sizing: content-box;
    width: 100%;
`;

const EditableTextArea = styled.textarea<{ isEditMode?: boolean; }>`
    font-family: Inter;
    border: 1px dashed ${({ isEditMode }) => isEditMode ? 'rgba(0, 0, 0, 0.2)' : 'transparent'};
    width: 100%;
    resize: none;
    background-color: white;
`;

const ProjectCard: React.FC<TProps> = ({ project }) => {
    const isEditMode = useSelector<RootState, boolean>((state) => state.projects.isEditMode);
    const dispatch = useDispatch();

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(updateOne({
            ...project,
            [e.target.id]: e.target.value
        }))
    }, [project, dispatch]);

    const handleDeleteClick = useCallback(async (e) => {
        dispatch(remove(project.eid));
    }, [project, dispatch]);

    return (
        <StyledCard>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <img className="background" src="/card-bg.svg" alt="card background" />
                    {isEditMode && <AddIcon className="add-icon" />}
                    <Fab aria-label="add">
                        <img className="logo" src="/a-team-logo-1.svg" alt="project logo" />
                    </Fab>
                    <EditableField
                        id="title"
                        onChange={handleInputChange}
                        disabled={!isEditMode}
                        isEditMode={isEditMode}
                        className="project-title"
                        value={project.title}/>
                    <EditableTextArea
                        id="description"
                        onChange={handleInputChange}
                        disabled={!isEditMode}
                        isEditMode={isEditMode}
                        className="project-description"
                        value={project.description}/>
                    <div className="role-wrapper">
                        <WorkOutlineIcon className="role-icon" />
                        <EditableField
                            id="jobRole"
                            onChange={handleInputChange}
                            disabled={!isEditMode}
                            isEditMode={isEditMode}
                            className="äsd-asd"
                            value={project.jobRole}/>
                   </div>
                    <div className="divider" />
                    <div className="footer">
                        <img className="project-avatar" src="/avatar.jpeg" alt="avatar"/>
                        {isEditMode && <DeleteOutlineIcon onClick={handleDeleteClick} />}
                    </div>
                </CardContent>
            </Card>
        </StyledCard>
    );
};

export default ProjectCard;