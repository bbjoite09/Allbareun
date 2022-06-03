export interface UserState {
  name: string;
  userSex: string;
  userBMI: string | undefined | null;
  id: string;
}

// initial state
const initialState: UserState = {
  name: '---',
  userSex: 'F',
  userBMI: '❌',
  id: 'pa09',
};

// action
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USER_ID = 'SET_USER_ID';

export const setUserData = (name: string, userSex: string, userBMI?: any) => {
  return {
    type: SET_USER_DATA,
    name,
    userSex,
    userBMI: userBMI ? userBMI : '❌',
  };
};

export const setUserId = (id: string) => {
  return {
    type: SET_USER_ID,
    id,
  };
};

// reducer
export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        name: action.name,
        userSex: action.userSex,
        userBMI: action.userBMI,
      };
    }
    case SET_USER_ID: {
      return {
        ...state,
        id: action.id,
      };
    }
    default:
      return state;
  }
};
