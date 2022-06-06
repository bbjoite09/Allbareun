import axios from 'axios';
import { axiosSrc } from '../static/url/axiosSrc';

class FoodService {
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
