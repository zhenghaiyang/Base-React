import  React,{ Component } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
const utils = require("../../../../utils")
import API_CONFIG from '../../api.js';
export default class EnterRiskTable extends Component {

    constructor(props) {
      super(props);
      this.checkInfo=this.checkInfo.bind(this);
    }


    // 查看详情
    checkInfo(obj) {
        this.props.getInfoByIdFN(obj)
    }
    onExport(obj){
      let submitUrl = `${API_CONFIG.ENTERRISK_GET_RISK}?type=` + obj;
      window.location.href = encodeURI(submitUrl)
    }



  render() {
    const column=[
	//{
      //title:"进件流水号",
      //dataIndex:"id"
    //},
	{
      title:"进件时间",
      //dataIndex:"createTime"
      render:(obj)=>{
        return (
          <span>{utils.timestampToStringHMMS(obj.createTime)}</span>
        )
      }
    },{
      title:"业务条线编号",
      dataIndex:"productId"
    },{
      title:"业务条线名称",
      dataIndex:"productName"
    },{
      title:"姓名",
      dataIndex:"inputName"
    },{
      title:"手机号",
      dataIndex:"inputCell"
    },{
      title:"证件号",
      dataIndex:"inputIdcard"
    },{
      title:"决策结果",
    //  dataIndex:"decisionResult"
      // render:(obj)=>{
      //     switch (obj.decisionResult) {
      //       case "1":
      //           return (<span style={{color:"#5eb95e"}} key={`${obj.id}`}>成功</span>)
      //       case "2":
      //           return (<span style={{color:"#FF0000"}} key={`${obj.id}`}>拒绝</span>)
      //       case "3":
      //           return (<span style={{color:"rgb(230,162,60)"}} key={`${obj.id}`}>人工审批</span>)
      //       case "-1":
      //           return (<span style={{color:"#1890ff"}} key={`${obj.id}`}>未配置</span>)
      //       default:
      //         return
      //     }
      // }
      render:(obj)=>{
        return (
          <span className="useClass">{obj.decisionResult}</span>
        )
      }
    },{
      title:"反欺诈评分",
      dataIndex:"decisionScore"
    },{
      title:"操作",
      render:(obj)=>{
        return(
          <div>
              <span style={{color:"#1890ff",cursor:"pointer"}} onClick={()=>this.checkInfo(obj)}>详情</span>
              {
                  obj.decisionResult == "通过" ? (
                    <span style={{color:"#1890ff",cursor:"pointer",paddingLeft:"20px"}} onClick={()=>this.onExport(3)}>下载</span>
                  ) : (
                       <span style={{color:"#1890ff",cursor:"pointer",paddingLeft:"20px"}} onClick={()=>this.onExport(2)}>下载</span>
                  )
              }
          </div>
        )
      }
    }]

    let tableDataList = this.props.datasource && this.props.datasource.riskList && this.props.datasource.riskList.result
    let tablelist = tableDataList && tableDataList.list

    return (
      <Table
          columns={column}
          dataSource={tablelist?tablelist:[]}
          locale={{emptyText:"暂无数据"}}
          pagination={false}
          rowKey={record=>record && record.id}
          bordered={false}
      />
    )
  }
}
