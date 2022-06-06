import FoodService from './FoodService';
import HealthService from './HealthService';
import MissionService from './MissionService';
import UserService from './UserService';

export const service = {
  user: new UserService(),
  food: new FoodService(),
  health: new HealthService(),
  mission: new MissionService(),
};
