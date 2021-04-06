import { Input, Box, InputGroup, InputRightElement } from '@chakra-ui/react';
import debounce from 'lodash.debounce';
import { getSongsListBySearchWord } from './actions';
import { useCallback } from 'react';

const SongSearchInput = ({songListUpdate, loadFlagUpdate, rightElement, onChange = ()=>{}, ...rest})=>{

    const searchTextChange = useCallback((e)=>{
        
        const debouncedSearchFun = debounce(async ({target})=>{
            const textVal = target.value;
            loadFlagUpdate(true);
            const [error, data] = await getSongsListBySearchWord(textVal);
            if(error){
                songListUpdate(error);
            }else{
                songListUpdate(data);
            }
            loadFlagUpdate(false);
        }, 500);
        onChange(e);
        debouncedSearchFun(e);
    },[loadFlagUpdate, songListUpdate, onChange]);
      
    return (<Box m="3" {...rest}>
        <InputGroup>
            <Input onChange={searchTextChange} placeholder="Search for Songs..." size="lg" pr={rightElement ? '5rem': ''} />
            {(rightElement) && (<InputRightElement width="5rem">
                {rightElement}
            </InputRightElement>)}
        </InputGroup>
</Box>)
}

export default SongSearchInput;