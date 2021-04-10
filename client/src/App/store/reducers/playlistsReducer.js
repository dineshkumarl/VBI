const playListReducer = (state, action)=>{
    switch(action.type) {
        case "UPDATE_PLAYLISTS_LIST":
          return {...state, list: action.value};
        default:
          return state;
      } 
}

export default playListReducer;