const homePageReducer = (state, action)=>{
    switch(action.type) {
        case "UPDATE_SONG_LIST":
          return {...state, songsList: action.value};
        default:
          return state;
      } 
}

export default homePageReducer;