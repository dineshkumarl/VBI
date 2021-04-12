import axios from 'axios';
import _get from 'lodash.get'

axios.interceptors.response.use((response)=>{
    if(_get(response,'data.errors')){
        return [response.data.errors];
    }
    if(response.data.data){
        return [null, response.data.data];
    }else if(response.data){
        return [null, response.data];
    }else{
        return [null, response];
    }
},(error)=>{
    return Promise.reject(error);
})

export const setDefaults = (defaults)=>{
    axios.defaults = {...axios.defaults, defaults};
}

export const httpGet = async (url, params, options = {})=>{
    try{
        const [errors, response] = await axios.get(url, {params});
       if(errors){
           return [errors];
       }else{
           return [null, response];
       }
    }catch(e){
        return [e];
    }
}

export const httpPost = async (url, params, options = {})=>{
    try{
        const [errors, response] = await axios.post(url, params);
        if(errors){
            return [errors]
        }else{
            return [null, response];
        }
     }catch(e){
         console.log(e);
         return [e];
     }
}

const defaultExports = {httpGet, httpPost, setDefaults} 

export default defaultExports