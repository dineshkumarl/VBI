import http from '../../utilities/http';
import * as gql from 'gql-query-builder';

export const addSongIdInPlaylist = async (songId, playlistId)=>{
    const query = gql.mutation({
        operation:'addSongToPlaylist',
        fields: ['_id','name', 'created', {songs:['_id','title', {singers:['name']}, {album:['name']}]}],
        variables:{songId, playlistId}
    })
    const [error, data] = await http.httpPost('/v1/vbi', query);
    if(error || data.errors){
        return [error || data.errors[0]]
    }else{
        return [null, data.addSongToPlaylist]
    }
}

export const deleteSongIdInPlaylist = async (songId, playlistId)=>{
    const query = gql.mutation({
        operation:'deleteSongFromPlayList',
        fields: ['_id','name', 'created', {songs:['_id','title', {singers:['name']}, {album:['name']}]}],
        variables:{songId, playlistId}
    })
    const [error, data] = await http.httpPost('/v1/vbi', query);
    if(error){
        return [error]
    }else{
        return [null, data.deleteSongFromPlayList]
    }
}

export const getPlayListDetailById = async (id)=>{
    const query = gql.query({
        operation:'playlists',
        fields: ['_id','name', 'created', {songs:['_id','title', {singers:['name']}, {album:['name']}]}],
        variables:{id}
    })
    const [error, data] = await http.httpPost('/v1/vbi', query);
    if(error){
        return [error]
    }else{
        return [null, data.playlists]
    }
}

export const getPlayLists = async()=>{
    const query = gql.query({
        operation:'playlists',
        fields: ['_id','name', 'created']
    })
    return await http.httpPost('/v1/vbi', query);
}

export const createPlayList = async (name)=>{
    const query = gql.mutation({
        operation: 'createPlaylist',
        fields: ['name', 'created'],
        variables:{name}
      })
    const [error, data] = await http.httpPost('/v1/vbi', query);
    if(error || data.errors){
        return [error || data.errors[0]]
    }
    if(name === ''){
        return [null, []];
    }else{
        return [null, data.createPlaylist]
    }
}