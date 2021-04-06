import http from '../../utilities/http';

const getTrendingSongList = async (limit = 20)=>{
    const [error, data] = await http.httpGet('https://jsonplaceholder.typicode.com/photos');
    if(error){
        return [error];
    }else{
        return [null, (data).slice(0, limit)];
    }
}

export const getSongsListBySearchWord = async (searchWord = '')=>{
    const [error, data] = await http.httpGet('https://jsonplaceholder.typicode.com/photos');
    if(error){
        return [error]
    }
    if(searchWord === ''){
        return await getTrendingSongList(10);
    }else{
        return [null, (data || []).slice(0,100)]
    }
}