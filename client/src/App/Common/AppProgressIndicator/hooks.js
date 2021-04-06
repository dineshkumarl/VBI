import {useState} from 'react';

export const useAppProgressIndicator = (initialValue)=>{
    const [showingProgressIndicator, updateShowProgress] = useState(initialValue);

    const showProgressIndicator = ()=>{
        updateShowProgress(true);
    }

    const hideProgressIndicator = ()=>{
        updateShowProgress(false);
    }

    const toggleProgressIndicator = ()=>{
        updateShowProgress(!showingProgressIndicator)
    }

    return {
        showingProgressIndicator,
        showProgressIndicator,
        hideProgressIndicator,
        toggleProgressIndicator
    }
}
