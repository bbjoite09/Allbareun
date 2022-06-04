export interface UserState {
  name: string;
  userSex: string;
  userBMI: string | undefined | null;
  userKcal: number;
  parentId: string;
  childId: string;
}

// initial state
const initialState: UserState = {
  name: '---',
  userSex: 'F',
  userBMI: '❌',
  userKcal: 1550,
  parentId: 'pa09',
  childId: 'pa09',
};

// action
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USER_ID = 'SET_USER_ID';

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
    default:
      return state;
  }
};
