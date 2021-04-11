const playListReducer = (state, action)=>{
    switch(action.type) {
        case "UPDATE_PLAYLISTS_LIST":
          return {...state, list: action.value};
        case "UPDATE_CURRENT_SONG_LIST":
          return {...state, currentSongList: action.value}
          case "UPDATE_SEARCHED_SONG_LIST":
            return {...state, searchedSongList: action.value}
        default:
          return state;
      } 
}

export default playListReducer;