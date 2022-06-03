import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
import { axiosSrc } from '../static/url/axiosSrc';

class HealthService {
  resetBodyData = async (
    weight: number,
    height: number,
    age: number,
    active_kcal: number,
    url: string,
  ) => {
    const data = await axios
      .patch(url, {
        weight,
        height,
        age,
        active_kcal,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
    return data;
  };

  setBodyData = async (
    weight: number,
    height: number,
    age: number,
    active_kcal: number,
    url: string,
  ) => {
    const data = await axios
      .post(url, {
        weight,
        height,
        age,
        active_kcal,
      })
      .then(response => {
        if (response.data.success) {
          return response.data;
        } else {
          this.resetBodyData(weight, height, age, active_kcal, url);
        }
      })
      .catch(error => {
        throw error;
      });
    return data;
  };

  getBodyData = async (url: string) => {
    const data = await axios.get(url).then(res => {
      return res;
    });
    return data;
  };
}

export default HealthService;
