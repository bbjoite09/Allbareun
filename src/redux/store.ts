import { combineReducers, createStore, Reducer, Store } from 'redux';
import { userReducer, UserState } from './modules/userInfo';
// reducers

const rootReducer: Reducer = combineReducers({
  user: userReducer,
});

const store: Store = createStore(rootReducer);

// RootState type
// export type RootState = ReturnType<typeof rootReducer>;
export type RootState = { user: UserState };

export default store;
