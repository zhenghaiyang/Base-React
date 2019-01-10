import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import  createLogger  from 'redux-logger';  // 日志中间件，不需要可以去掉,开发用的
import reducer from '../reducers';  // 引入reducer

// 打包的时候去掉 loggers
//const loggers = createLogger({})


const store = createStore(reducer, {}, applyMiddleware(
  thunkMiddleware,
  promiseMiddleware(),
  //loggers,
));


export default store;
