import API from './api-requester';
// import {await} from 'axios';

/*
 * @credentials : { login:'someLogin', password:'somePasswd' }
 *
 */
export default async function apiStartSession(credentials){
  return await API({url:'/session/start',method:"POST",data:credentials})
    .then(function(response){
      console.log("RETURNED BY REQUEST", response);
      return {
        status: response.status,
        data:response.data
      };
    },function(response){
      console.log("RETURNED BY REQUEST", response);
      return {
        status: response.status,
        data:response.error
      };
    });
}
