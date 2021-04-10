import axios from 'axios';

axios.interceptors.response.use((response)=>{
    if(response.data.data){
        return response.data.data;
    }else if(response.data){
        return response.data
    }else{
        return response;
    }
},(error)=>{
    return Promise.reject(error);
})

export const setDefaults = (defaults)=>{
    axios.defaults = {...axios.defaults, defaults};
}

export const httpGet = async (url, params, options = {})=>{
    try{
       const response = await axios.get(url, {params});
       return [null, response];
    }catch(e){
        return [e];
    }
}

export const httpPost = async (url, params, options = {})=>{
    try{
        const response = await axios.post(url, params);
        return [null, response];
     }catch(e){
         console.log(e);
         return [e];
     }
}

const defaultExports = {httpGet, httpPost, setDefaults} 

export default defaultExports