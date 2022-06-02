import FoodService from './FoodService';
import UserService from './UserService';

export const service = {
  user: new UserService(),
  food: new FoodService(),
};
