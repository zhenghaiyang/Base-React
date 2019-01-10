import API_CONFIG from '../api.js'
import HTTPAxios from '../utils/axios.js';
import {
ENTERRISK_GET_ENTERRISKTABLE_LIST,
ENTERRISK_GET_ENTERRISKTABLE_LIST_PENDING,
ENTERRISK_GET_ENTERRISKTABLE_LIST_FULFILLED,
ENTERRISK_GET_ENTERRISKTABLE_LIST_REJECTED,
ENTERRISK_UPDATE_SEARCHDATA,
ENTERRISK_GET_BUSINESSLINE_BYUSER,
ENTERRISK_GET_BUSINESSLINE_BYUSER_PENDING,
ENTERRISK_GET_BUSINESSLINE_BYUSER_FULFILLED,
ENTERRISK_GET_BUSINESSLINE_BYUSER_REJECTED,
ENTERRISK_GET_OBJINFOBYID,
ENTERRISK_GET_OBJINFOBYID_PENDING,
ENTERRISK_GET_OBJINFOBYID_FULFILLED,
ENTERRISK_GET_OBJINFOBYID_REJECTED,
ENTERRISK_GET_TYPES_LIST,
ENTERRISK_GET_TYPES_LIST_PENDING,
ENTERRISK_GET_TYPES_LIST_FULFILLED,
ENTERRISK_GET_TYPES_LIST_REJECTED,
ENTERRISK_GET_EXPORT,
ENTERRISK_GET_EXPORT_PENDING,
ENTERRISK_GET_EXPORT_FULFILLED,
ENTERRISK_GET_EXPORT_REJECTED,

} from './actionType.js';

export default function(state={},action){
  switch (action.type) {
    case ENTERRISK_GET_ENTERRISKTABLE_LIST_FULFILLED:
      return {
        ...state,
        riskList:action.payload && action.payload.data
      }
    case ENTERRISK_UPDATE_SEARCHDATA:
      return {
        ...state,
        searchData:action.searchData
      }
    case ENTERRISK_GET_BUSINESSLINE_BYUSER_FULFILLED:
      return {
        ...state,
        prodoctNameList:action.payload && action.payload.data
      }
    case ENTERRISK_GET_OBJINFOBYID_FULFILLED:
      return {
        ...state,
        enterInfo:action.payload && action.payload.data
      }
    case ENTERRISK_GET_TYPES_LIST_FULFILLED:
      return {
        ...state,
        typesList:action.payload && action.payload.data
      }
    case ENTERRISK_GET_EXPORT_FULFILLED:
      return {
        ...state,
        downloadState:action.payload && action.payload.data
      }
    
    default:
      return state
  }
}



// 获取风险预警列表
export function getEnterRiskList(param) {
  let params={}
  params.pageSize=param.pageSize; // 每页多少条
  params.pageNum=param.pageNum; // 请求第几页
  params.startTime=param.startTime; // 开始日期
  params.endTime=param.endTime;// 结束日期
  params.productCode=param.productCode;// 业务条线名称
  params.decisionResult=param.decisionResult; // 决策结果
  params.inputName=param.inputName;// 名字
  params.inputCell=param.inputCell;// 手机号
  params.inputIdcard=param.inputIdcard;// 证件号
  return{
    type:ENTERRISK_GET_ENTERRISKTABLE_LIST,
    payload: HTTPAxios(API_CONFIG.GET_ENTERRISK_LIST,"POST",params)
  }
}

// 获取当前用户下的业务条线
export function getProdoctNameListByUser() {
  return {
    type:ENTERRISK_GET_BUSINESSLINE_BYUSER,
    payload: HTTPAxios(API_CONFIG.ENTERRISK_GET_PRODOCTNAMELISTBYUSER,"GET")
  }
}
// 更新搜索的内容
export function updateSearchData(param) {
  return {
    type:ENTERRISK_UPDATE_SEARCHDATA,
    searchData:param
  }
}

// 根据id获取详情
export function getInfoById(params) {
  let param={}
  param.entryId=params.id; // id
  return {
    type:ENTERRISK_GET_OBJINFOBYID,
    payload: HTTPAxios(API_CONFIG.ENTERRISK_GET_ENTRYINFOBYID,"GET",param)
  }
}

// 获取决策结果
export function getTpesList() {
  return {
    type:ENTERRISK_GET_TYPES_LIST,
    payload: HTTPAxios(API_CONFIG.ENTERRISK_GET_TYPES,"GET")
  }
}

// 下载
export function downloadTable(params) {
  return {
    type:ENTERRISK_GET_EXPORT,
    payload: HTTPAxios(API_CONFIG.ENTERRISK_GET_EXPORT,"GET",params)
  }
}