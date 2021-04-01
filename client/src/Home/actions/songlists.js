import Song, {SongListItemWithActions} from '../SongListItem';

// export const songListItemFactory = (list = [])=>list.map((props)=><SongListItem {...props}></SongListItem>);
// export const songListItemWithActionsFactory = (list = [])=>list.map((props)=><SongListItemWithActions {...props} />);

export const songListItemFactory = ()=> [<Song key="1"></Song>, <Song key="2"></Song>, <Song key="3"></Song>, <Song key="4"></Song>]
export const songListItemWithActionsFactory = ()=> [<SongListItemWithActions key="1"></SongListItemWithActions>, <SongListItemWithActions key="1"></SongListItemWithActions>, <SongListItemWithActions key="1"></SongListItemWithActions>, <SongListItemWithActions key="1"></SongListItemWithActions>]
