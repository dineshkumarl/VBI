import React, { createContext, useReducer, useContext } from "react";
import combinedReducers from './reducers';

const initialState = {
  homePage:{
    songsList:[]
  },
  playLists:{
    list:[],
    currentPlayListIndex:-1
  }
};

const StoreContext = createContext(initialState);

// useStore will be used in React components to fetch and mutate state
export const useStore = () => {
  const { state, dispatch } = useContext(StoreContext);
  return { state, dispatch };
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(combinedReducers, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};


export default StoreProvider
