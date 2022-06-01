import axios from 'axios';
import { axiosSrc } from '../static/url/axiosSrc';

class UserService {
  signUp = async (
    user_id: string,
    user_password: string,
    name: string,
    user_type: string,
    user_sex: string,
  ) => {
    const data = await axios
      .post(axiosSrc.signUp, {
        user_id,
        user_password,
        name,
        user_type,
        user_sex,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
    return data;
  };
}

export default UserService;
