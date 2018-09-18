import PROFESSOR_API_REQUESTER from './professor-api-requester-by-user';
// import {await} from 'axios';

export default async function ProfessorRequestByUser(options){
  return await PROFESSOR_API_REQUESTER(options);
}
