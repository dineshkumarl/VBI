import http from '../../utilities/http';
import * as gql from 'gql-query-builder';

export const getPlayLists = async()=>{
    const query = gql.query({
        operation:'playlists',
        fields: ['id','name']
    })
    return await http.httpPost('/v1/vbi', query);
}

export const createPlayList = async (name)=>{
    const query = gql.mutation({
        operation: 'createPlaylist',
        fields: ['id', 'name'],
        variables:{name}
      })
    const [error, data] = await http.httpPost('/v1/vbi', query);
    if(error){
        return [error]
    }
    if(name === ''){
        return [null, []];
    }else{
        return [null, data.createPlaylist]
    }
}