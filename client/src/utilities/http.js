import axios from 'axios';

export const setDefaults = (defaults)=>{
    axios.defaults = {...axios.defaults, defaults};
}

export const httpGet = async (url, params, options = {})=>{
    try{
       const response = await axios.get(url, {params});
       return [null, response.data];
    }catch(e){
        return [e];
    }
}

export const httpPost = async (url, params, options = {})=>{
    try{
        const response = await axios.post(url, params);
        return [null, response.data];
     }catch(e){
         return [e];
     }
}

const defaultExports = {httpGet, httpPost, setDefaults} 

export default defaultExports