import PROFESSOR_API_REQUESTER from './professor-api-requester';
// import {await} from 'axios';

export default async function ProfessorRequest(options){
  return await PROFESSOR_API_REQUESTER(options)
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
        data: response.error
      };
    });
}
