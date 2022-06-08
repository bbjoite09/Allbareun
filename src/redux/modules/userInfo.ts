export interface UserState {
  name: string;
  userSex: string;
  userBMI: string | undefined | null;
  userKcal: number;
  parentId: string;
  childId: string;
  userType: string;
}

// initial state
const initialState: UserState = {
  name: '---',
  userSex: 'F',
  userBMI: '❌',
  userKcal: 1550,
  parentId: 'pa09',
  childId: 'pa09',
  userType: 'parent',
};

// action
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USER_ID = 'SET_USER_ID';
export const SET_USER_TYPE = 'SET_USER_TYPE';

export const setUserData = (
  name: string,
  userSex: string,
  userBMI?: any,
  userKcal?: any,
) => {
  return {
    type: SET_USER_DATA,
    name,
    userSex,
    userBMI: userBMI ? userBMI : '❌',
    userKcal: userKcal ? userKcal : 1550,
  };
};

export const setUserId = (parentId: string, childId: string) => {
  return {
    type: SET_USER_ID,
    parentId,
    childId,
  };
};
export const setUserType = (userType: string) => {
  return {
    type: SET_USER_ID,
    userType,
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
        userKcal: action.userKcal,
      };
    }
    case SET_USER_ID: {
      return {
        ...state,
        parentId: action.parentId,
        childId: action.childId,
      };
    }
    case SET_USER_TYPE: {
      return {
        ...state,
        userType: action.userType,
      };
    }
    default:
      return state;
  }
};
