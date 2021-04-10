import http from '../../utilities/http';
export const logIn = async ({userName, password})=>{
   try{
       return await http.httpPost('/user/login', {"username":userName, "password":password});
   }catch(e){
       return {message: 'Error in login'};
   }
}

export const getSession = async ()=>{
    try{
        return await http.httpGet('/user/session');
    }catch(e){
        return {message: 'invalid session'}
    }
}

export const logOut = async ()=>{
    return await http.httpGet('/user/logout');
}
