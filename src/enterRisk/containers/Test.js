import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as TestActions from '../reducers/reducer.js'
import {
  TestChildren,
  EnterRiskSearch
} from '../components';  // 引入子组件
import { Button,Select,Icon } from 'antd'
import 'antd/dist/antd.css';

@connect(
  state=>({
    testData: state.enterRiskStore
  }),
  dispatch => bindActionCreators({...TestActions},dispatch)
)
export default class Test extends Component {




  render() {
    console.log('test',this.props)
    return (
      <div>
        <div style={{height:"110pxs"}}>
          <EnterRiskSearch/>
        </div>

      </div>
    )
  }
}
