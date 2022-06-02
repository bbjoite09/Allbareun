import FoodService from './FoodService';
import HealthService from './HealthService';
import UserService from './UserService';

export const service = {
  user: new UserService(),
  food: new FoodService(),
  health: new HealthService(),
};
