import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as EnterRiskActions from '../reducers/reducer.js'
const utils = require("../../../utils")
import {
  EnterRiskSearch,
  EnterRiskTable,
  EnterRiskPagination,
  EnterRiskInfo
} from '../components';  // 引入子组件
import { Button,Select,Icon,message,Modal,Row,Col,Breadcrumb } from 'antd'
import 'antd/dist/antd.css';
import './EnterRisk.css';

@connect(
  state=>({
    enterRiskData: state.enterRiskStore
  }),
  dispatch => bindActionCreators({...EnterRiskActions},dispatch)
)
export default class EnterRisk extends Component {

  constructor(props) {
    super(props);
    this.state={
      visible:false,
      selectKey:"1"
    }
    this.openModal=this.openModal.bind(this);  // 打开弹出框
    this.getInfoById=this.getInfoById.bind(this); // 获得详情
    this.renderTitle=this.renderTitle.bind(this);// 渲染title
    this.handleCancel=this.handleCancel.bind(this);// 关闭modal
    this.handelReload=this.handelReload.bind(this);// 刷新当前页
    this.handleOnChange=this.handleOnChange.bind(this); // 更新选择的tabs
  }


  componentWillMount() {
    // 获取风险预警表单列表
    let params={}
    params.pageSize=10; // 每页多少条
    params.pageNum=1;// 请求第几页
    params.decisionResult='10032' // 默认拒绝
    this.props.updateSearchData(params); // 保存查询的参数
    this.props.getEnterRiskList(params); // 请求列表页面
    this.props.getProdoctNameListByUser();// 获取当前用户下的业务条线
    this.props.getTpesList(); // 获取决策结果类型
  }

    // 打开弹出框
    openModal() {
      this.setState({
        visible:true
      })
    }

    //关闭弹窗
    handleCancel() {
      this.setState({
        visible:false,
        selectKey:"1"
      })
    }
    handleOnChange(key) {
      this.setState({
        selectKey:key
      })
    }

    handelReload() {
      window.location.href=window.location
    }

    // 渲染title
    renderTitle(datas) {
      //let decisionResults =  datas.decisionResult !=null ? (datas.decisionResult ==1 ?("通过"):(datas.decisionResult ==2?("拒绝"):(datas.decisionResult==-1?("未配置"):("人工审批")))):""
      let data = {
        '进件编号':datas.id,
        '进件时间':utils.timestampToString(datas.createTime),
        '业务条线编号':datas.productId,
        '业务条线名称':datas.productName,
        '决策结果':datas.decisionResult,
        '反欺诈评分':datas.decisionScore
      }
      var arry=[]
      for(let key in data) {
        arry.push(<span style={{display:"block",width:"50%",float:"left",lineHeight:'30px'}} key={`${key}`}>{key+"："}<span>{data[key]}</span></span>)
      }
      return (
        <div style={{overflow:'hidden'}} className="desTitle">
          {
            arry.map((data,index)=>{
              return <div key={`${index}`}>{data}</div>
            })
          }
        </div>
      )
    }

    getInfoById(obj) {
      const that=this;
      this.props.getInfoById(obj)
      .then((res)=>{
        let code = res && res.value && res.value.data && res.value.data.code
        if(code==200) {
          that.openModal()
        }
      })
      //that.openModal()
    }


  render() {
    let datasource = this.props.enterRiskData && this.props.enterRiskData
    let infosource = this.props.enterRiskData && this.props.enterRiskData.enterInfo && this.props.enterRiskData.enterInfo.result
    let warningData = infosource && infosource.warnData
    const modaleTitle =warningData && this.renderTitle(warningData)
    return (
      <div className="outerBody">
          <div style={{borderRadius:"4px"}} className="bgfff searchBody">
            <EnterRiskSearch
              getEnterRiskListFN={this.props.getEnterRiskList}
              updateSearchDataFN={this.props.updateSearchData}
              downloadTableFN={this.props.downloadTable}
              datasource={datasource}
            />
          </div>
          <div style={{background:'#fff',marginTop:'15px',borderRadius:'4px',padding:'20px'}}>
            <div style={{overflow:"hidden",marginBottom:"14px"}}>
                <div className="whiteTitle">进件列表</div>
                
            </div>
            <EnterRiskTable
                datasource={datasource}
                getInfoByIdFN={(obj)=>this.getInfoById(obj)}
                downloadPdfFN={this.props.downloadPdf}
            />
          </div>
          <div style={{padding:"30px",textAlign:'center'}} className="bgfff">
            <EnterRiskPagination
              datasource={datasource}
              getEnterRiskListFN={this.props.getEnterRiskList}
              updateSearchDataFN={this.props.updateSearchData}
            />
          </div>
          <Modal
            title={"详情"}
            visible={this.state.visible}
            footer={null}
            width="800px"
            onCancel={this.handleCancel}
            mask={false}
            bodyStyle={{"height":"350px",overflow:"auto"}}
          >
            {modaleTitle}
            <EnterRiskInfo
              datasource={infosource}
              selectKey={this.state.selectKey}
              handleOnChangeFN={(key)=>this.handleOnChange(key)}
            />
          </Modal>
      </div>
    )
  }
}            
// 