import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TProject } from '../../api/projects';

export type TProjectsState = {
    projects: TProject[];
    originalValues: TProject[];
    isEditMode: boolean;
    searchTerm: string;
};

export type TProjectsReducers = {
    set: (state: TProjectsState, action: PayloadAction<TProject[]>) => void;
    add: (state: TProjectsState, action: PayloadAction<TProject>) => void;
    remove: (state: TProjectsState, action: PayloadAction<string>) => void;
    copyOriginalValues: (state: TProjectsState, action: PayloadAction<void>) => void;
    resetChanges: (state: TProjectsState, action: PayloadAction<void>) => void;
    resetOriginalValues: (state: TProjectsState, action: PayloadAction<void>) => void;
    toggleEditMode: (state: TProjectsState, action: PayloadAction<void>) => void;
    updateOne: (state: TProjectsState, action: PayloadAction<TProject>) => void;
    setSearchTerm: (state: TProjectsState, action: PayloadAction<string>) => void;
}

export const projectsSlice = createSlice<TProjectsState, TProjectsReducers>({
    name: 'projects',
    initialState: {
        projects: [],
        originalValues: [],
        isEditMode: false,
        searchTerm: "",
    },
    reducers: {
        set: (state, action) => {
            state.projects = action.payload;
            state.originalValues = state.projects.map(project => ({ ...project }));
        },
        add: (state, action) => {
            state.projects.push(action.payload);
        },
        remove: (state, action) => {
            state.projects = state.projects.filter(p => p.eid !== action.payload);
        },
        copyOriginalValues: (state) => {
            state.originalValues = state.projects.map(project => ({ ...project }));
        },
        resetOriginalValues: (state) => {
            state.originalValues = [];
        },
        resetChanges: (state) => {
            state.projects = state.originalValues;
        },
        toggleEditMode: (state) => {
            state.isEditMode = !state.isEditMode;
        },
        updateOne: (state, action) => {
            state.projects = state.projects.map(
                project => project.eid === action.payload.eid ? action.payload : project
            );
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        }
    }
});

export const { set, add, remove, toggleEditMode, copyOriginalValues, resetChanges, updateOne, setSearchTerm } = projectsSlice.actions;

export default projectsSlice.reducer;