import axios from 'axios';

class UserService {
  signup = async (
    user_id: string,
    user_password: string,
    name: string,
    user_type: string,
    user_age: string,
  ) => {
    const data = await axios
      .post('https://localhost:3000/api/users/register', {
        user_id,
        user_password,
        user_age,
        name,
        user_type,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
    return await data;
  };
}

export default UserService;
