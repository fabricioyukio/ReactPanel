import axios from 'axios';
import * as Config from '../constants/config';
export default axios.create({
  baseURL: Config.API_URL+"/professor",
  validateStatus: function (status) {
    return status < 500;
  }
});
