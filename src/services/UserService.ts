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

  signIn = async (user_id: string, user_password: string) => {
    const data = await axios
      .post(axiosSrc.signIn, {
        user_id,
        user_password,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
    return data;
  };

  pairing = async (user_id: string) => {
    const data = await axios
      .patch(axiosSrc.pairing, {
        user_id,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
    return data;
  };

  getAuth = async () => {
    await axios.get(axiosSrc.auth).then(res => console.log(res.data));
  };
}

export default UserService;
