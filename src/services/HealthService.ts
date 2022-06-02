import axios from 'axios';
import { axiosSrc } from '../static/url/axiosSrc';

class HealthService {
  setBodyData = async (
    weight: number,
    height: number,
    age: number,
    active_kcal: number,
  ) => {
    const healthUrl = axiosSrc.health + '/ch2';
    const data = await axios
      .post(healthUrl, {
        weight,
        height,
        age,
        active_kcal,
      })
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .catch(error => {
        throw error;
      });
    return data;
  };

  getBodyData = async () => {
    const data = await axios.get(axiosSrc.health + '/ch2').then(res => {
      return res;
    });
    return data;
  };
}

export default HealthService;
