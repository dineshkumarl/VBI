import http from '../../utilities/http';
import * as gql from 'gql-query-builder'

// const getTrendingSongList = async (limit = 20)=>{
//     const [error, data] = await http.httpGet('https://jsonplaceholder.typicode.com/photos');
//     if(error){
//         return [error];
//     }else{
//         return [null, (data).slice(0, limit)];
//     }
// }

export const getSongsListBySearchWord = async (searchWord = '')=>{
    const query = gql.query({
        operation: 'songs',
        variables: { title: searchWord },
        fields: ['id', 'title', {'singers':['name']}, {'album':['name']}]
      })
    const [error, {songs}] = await http.httpPost('/v1/vbi', query);
    if(error){
        return [error]
    }
    if(searchWord === ''){
        return [null, []];
    }else{
        return [null, (songs || []).slice(0,100)]
    }
}