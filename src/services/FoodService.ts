import axios from 'axios';
import { axiosSrc } from '../static/url/axiosSrc';

class FoodService {
  enrollFood = async (url: string, name: string) => {
    const data = await axios
      .post(url, {
        name,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
    return data;
  };

  getFoodList = async (url: string) => {
    const data = await axios.get(url).then(res => {
      return res.data;
    });
    return data;
  };

  getReport = async (url: string) => {
    const data = await axios.get(url).then(res => {
      return res.data;
    });
    return data;
  };
}

export default FoodService;
