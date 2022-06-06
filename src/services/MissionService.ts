import axios from 'axios';
import { Alert } from 'react-native';
import { axiosSrc } from '../static/url/axiosSrc';

class MissionService {
  getMission = async (url: string) => {
    const data = await axios.get(url).then(res => {
      return res.data;
    });
    return data;
  };

  sendMission = async (content: any) => {
    const data = await axios
      .post(axiosSrc.setMission, {
        content,
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

export default MissionService;
