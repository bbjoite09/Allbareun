import axios from 'axios';
import { axiosSrc } from '../static/url/axiosSrc';

class FoodService {
  enrollFood = async (name: string) => {
    const data = await axios
      .post(axiosSrc.food, {
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
}

export default FoodService;
