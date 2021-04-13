import http from '../../utilities/http';
import * as gql from 'gql-query-builder'


export const getSongsListBySearchWord = async (searchWord = '')=>{
    const query = gql.query({
        operation: 'songs',
        variables: { title: searchWord },
        fields: ['_id', 'title', {'singers':['name']}, {'album':['name']}, {'duration':['h','m','s']}]
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