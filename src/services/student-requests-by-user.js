import STUDENT_API_REQUESTER from './student-api-requester-by-user';
// import {await} from 'axios';

export default async function StudentRequestByUser(options){
  return await STUDENT_API_REQUESTER(options);
}
