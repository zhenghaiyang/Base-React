import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import EnterRisk from './containers/EnterRisk';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
render(
  <LocaleProvider locale={zh_CN}>
  <Provider store={store}>
      <EnterRisk />
  </Provider>
  </LocaleProvider>
  ,document.getElementById("container")
)
