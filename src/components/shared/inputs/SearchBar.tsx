import React, { ChangeEventHandler } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setSearchTerm } from '../../../redux/slices/projectsSlice';

type TProps = {
    placeholder: string;
}

const StyledSearchBar = styled.div`
    position: fixed;
    top: 0;
    width: calc(100% - 120px);
    height: 45px;
    left: 120px;
    z-index: 1000;
    box-shadow: 0px 0px 11px -6px;

    input.search-value { 
        width: 100%;
        height: 100%;
        padding-left: 10px;
        padding-right: 30px;
    }

    .icon-wrapper {
        position: absolute;
        height: 24px;
        right: 10px;
        top: 0;
        bottom: 0;
        margin: auto;
    }
`;
    

const SearchBar: React.FC<TProps> = ({ placeholder }) => {
    const searchTerm = useSelector<RootState, string>((state) => state.projects.searchTerm);
    const dispatch = useDispatch();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(e.target.value));
    };

    return (
        <StyledSearchBar>
                <input className="search-value" value={searchTerm} onChange={handleOnChange} placeholder={placeholder} />
                <div className="icon-wrapper">
                    <SearchIcon />
                </div>
        </StyledSearchBar>
    )
};

export default SearchBar;