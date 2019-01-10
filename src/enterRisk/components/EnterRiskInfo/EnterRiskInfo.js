import React,{ Component } from 'react';
import { Tabs,Input  } from 'antd';
import 'antd/dist/antd.css';
import './enterRiskInfo.css';
import EnterRiskInfoTable from './EnterRiskInfoTable';
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

// 第三方数据产品


// 内部数据产品
const  inner=[{
  title:"返回字段",
  dataIndex:"ename",
  width:"40%"
},{
  title:"返回字段(中文)",
  dataIndex:"cname",
  width:"40%"
},{
  title:"返回值",
  dataIndex:"value",
  width:"20%"
}]

// 命中规则
const rule=[{
  title:"规则名称",
  dataIndex:"ruleName",
  width:"50%"
},{
  title:"命中结果",
  dataIndex:"result",
  width:"49%"
}]


export default class EnterRiskInfo extends Component {

  constructor(props) {
    super(props);
    this.thirdDataPro=[{
      title:"返回字段",
      dataIndex:"ename",
      width:"40%"
    },{
      title:"返回字段(中文)",
      dataIndex:"cname",
      width:"40%"
    },{
      title:"返回值",
      // dataIndex:"value",
      width:"20%",
      render:(obj)=>{
          if(obj.ename=="file_path"&&obj.value.indexOf("http") != -1){
                return (
                  <span style={{color:"#1890ff",cursor:"pointer"}} onClick={()=>this.jumpTo(obj.value)}>详情</span>
                )
              }else{
                return (
                  <span>{obj.value}</span>
                )
            }
        }
    }];
    this.renderTitleSpanArry=this.renderTitleSpanArry.bind(this); // 处理进件数据 数组
    this.renderRules=this.renderRules.bind(this); // 处理规则集
    this.handleOnChange=this.handleOnChange.bind(this);
  }

  // 处理返回的数据 把必填项放到上面
  renderTitleSpanArry(data) {
    var submitArry=[];
    var rightArry=[];
    for(let i =0;i<data.length;i++) {
      if(data[i].isRequired==1){
        submitArry.push(data[i])
      }else{
        rightArry.push(data[i])
      }
    }
    return submitArry.concat(rightArry)
  }

  // 处理命中规则数据
  renderRules(ruleObj) {
    var submitArry=[]
    var uuid=0
    for(var key in ruleObj) {
      let obj={}
      let tempArry=[]
      obj.title=key;
      for(let keys in ruleObj[key]) {
        ++uuid
        let tempObj={}
        tempObj.ruleName=keys;
        tempObj.result=`${ruleObj[key][keys]}`;
        tempObj.index=uuid;
        tempArry.push(tempObj)
      }
      obj.dataArry=tempArry
      submitArry.push(obj)
    }
    return submitArry;
  }

  // 切换tabs
  handleOnChange(key) {
    this.props.handleOnChangeFN(key)
  }
  jumpTo(url){
    window.open(url)
  }




  render() {
      // <img src={require("../../../assets/img/znwushuju.png")} width="100%" height="100%"/>
    let matchNodes = this.props.datasource && this.props.datasource.matchNodes
    let jjzds = this.props.datasource && this.props.datasource.jjzds
    let ruleObj = this.props.datasource && this.props.datasource.hitRules
    let dsfsjs = this.props.datasource && this.props.datasource.dsfsjs
    let nbsjs = this.props.datasource && this.props.datasource.nbsjs
    let repParams = this.props.datasource && this.props.datasource.param
    const jjzdArry = this.renderTitleSpanArry(jjzds)
    const ruleList = this.renderRules(ruleObj)
    return (
      <Tabs
        defaultActiveKey={this.props.selectKey}
        activeKey={this.props.selectKey}
        onChange={this.handleOnChange}
        // tabBarStyle={{borderBottom:"1px solid red"}}
        >
        <TabPane tab="进件数据" key="1">
        <div className="my_info_table_info">
          {
              jjzdArry && jjzdArry.length>0 ? (
                jjzdArry.map((data,index)=>{
                  return (
                    <div style={{paddingLeft:'18px',lineHeight:"35px"}} key={`${index}`+"1"}>
                      <span className={data.isRequired==1?"isRequired_titleSpan":"titleSpan"}>{data.ename+"："}<span>{data.value}</span></span>
                    </div>
                  )
                })
              ) : (
                <div className="no_dataInfo_one" >

                  暂无数据
                </div>
              )
          }
        </div>
        </TabPane>
        <TabPane tab="第三方数据产品" key="2">
          {
            dsfsjs && dsfsjs.length>0?(
              dsfsjs.map((data,index)=>{
                return (
                  <div key={`${index}`+"007"}>
                      <EnterRiskInfoTable
                        columns={this.thirdDataPro}
                        datasource={data.data}
                        titles={data.title}
                      />
                  </div>
                )
              })
            ):(
              <div className="no_dataInfo">

                暂无数据
              </div>
            )
          }
        </TabPane>
        <TabPane tab="内部数据产品" key="3">
          {
            nbsjs && nbsjs.length>0?(
              nbsjs.map((data,index)=>{
                return (
                  <div  key={`${index}`+"007"}>
                      <EnterRiskInfoTable
                        columns={inner}
                        datasource={data.data}
                        titles={data.title}
                      />
                  </div>
                )
              })
            ):(
              <div className="no_dataInfo">

                暂无数据
              </div>
            )
          }
        </TabPane>
        <TabPane tab="命中规则" key="4">
          {
            ruleList && ruleList.length>0?(
              ruleList.map((data,index)=>{
                return (
                  <div  key={`${index}`+"001"}>
                      <EnterRiskInfoTable
                        columns={rule}
                        datasource={data.dataArry}
                        titles={data.title}
                      />
                  </div>
                )
              })
            ):(
              <div className="no_dataInfo">

                暂无数据
              </div>
            )
          }
        </TabPane>
        <TabPane tab="参数展示" key="5">
          <div >
            {
              repParams ? (
                <ParamInfo value={repParams} />
              ) : (
                <div className="no_dataInfo">
                  暂无数据
                </div>
              )
            }
          </div>
        </TabPane>
        <TabPane tab="流程跟踪" key="6">
          <div >
            {
              matchNodes ? (
                <TextArea value={matchNodes} autosize={true} />
              ) : (
                <div className="no_dataInfo">

                  暂无数据
                </div>
              )
            }
          </div>
        </TabPane>
      </Tabs>
    )
  }
}
