import axios from 'axios';
import { Alert } from 'react-native';
import { axiosSrc } from '../static/url/axiosSrc';

class MissionService {
  getRecommendMission = async (url: string) => {
    const data = await axios.get(url).then(res => {
      return res.data;
    });
    return data;
  };

  addPersonalMission = async (name: string) => {
    const data = await axios
      .post(axiosSrc.setPersonalMisson, {
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

  sendRecommendMission = async (content: any) => {
    const data = await axios
      .post(axiosSrc.setRecommendMission, {
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

  getMission = async (url: string) => {
    const data = await axios
      .get(url)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        throw error;
      });
    return data;
  };

  setMissionRecommendSuccess = async (url: string, name: string) => {
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
  setMissionPersonalSuccess = async (url: string, name: string) => {
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
}

export default MissionService;
