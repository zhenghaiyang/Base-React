import React,{Component} from 'react';
import { Pagination } from 'antd';


export default class EnterRiskPagination extends Component {
    constructor(props) {
      super(props);
      this.handleOnChange=this.handleOnChange.bind(this);
      this.handleOnShowSizeChange=this.handleOnShowSizeChange.bind(this);
    }
    // 点击分页 和 跳转
    handleOnChange(page,pageSize) {
      let value={};
      value.pageSize=pageSize; // 一页多少条数据
      value.pageNum=page; // 第几页
      let searchData=this.props.datasource.searchData;
      let params = Object.assign(searchData,value);
      this.props.getEnterRiskListFN(params);
      this.props.updateSearchDataFN(params);
    }

    // 调整第几页
    handleOnShowSizeChange(current,size) {
      // console.log(current)
      // console.log(size)
      let value={};
      value.pageSize=size; // 一页多少条数据
      value.pageNum=current==0?1:current; // 第几页
      let searchData=this.props.datasource.searchData;
      let params = Object.assign(searchData,value);
      this.props.getEnterRiskListFN(params);
      this.props.updateSearchDataFN(params);
    }

  render() {
    let data = this.props.datasource && this.props.datasource.riskList && this.props.datasource.riskList.result

    return (
        <Pagination
          current={data && data.pageNum}
          showTotal={total => `共 ${total} 条`}
          total={data && data.total}
          showSizeChanger
          showQuickJumper
          onChange={this.handleOnChange}
          onShowSizeChange={this.handleOnShowSizeChange}
        />
    )
  }
}
