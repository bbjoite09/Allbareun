import axios from 'axios';
import { axiosSrc } from '../static/url/axiosSrc';

class MissionService {
  getMission = async (url: string) => {
    const data = await axios.get(url).then(res => {
      return res.data;
    });
    return data;
  };
}

export default MissionService;
