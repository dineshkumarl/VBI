import homePageReducer from './homepageReducer';
import playlistsReducer from './playlistsReducer';

const combineReducers = (reducers)=>{
    return (state = {}, action) => {
      const newState = {};
      for (let key in reducers) {
        newState[key] = reducers[key](state[key], action);
      }
      return newState;
    }
  }
  
export default combineReducers({
    homePage: homePageReducer,
    playLists: playlistsReducer
  })