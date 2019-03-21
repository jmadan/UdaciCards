import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
 
const error = () => next => (action) => {
    try {
      next(action);
    } catch (err) {
      console.log('error @ action: ', action, err);
    }
  };

const middleware = [thunk, error]
const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

export default store;