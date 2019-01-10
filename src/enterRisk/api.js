const baseUrl = 'http://localhost:8081' //本地/
//const baseUrl = ''
const API_CONFIG = {
    GET_ENTERRISK_LIST: baseUrl + "/admin/riskwarn/list",  //  获取风险预警表单列表
    ENTERRISK_GET_PRODOCTNAMELISTBYUSER: baseUrl + '/admin/common/productNames', // 获取用户下的业务条线
    ENTERRISK_GET_ENTRYINFOBYID: baseUrl + '/admin/riskwarn/list/detail', // 获取预获取预警详情警详情
    ENTERRISK_GET_TYPES: baseUrl + '/admin/riskwarn/types', //
    ENTERRISK_GET_EXPORT: baseUrl + '/admin/riskwarn/exportToXml', //下载
    ENTERRISK_GET_RISK: baseUrl + '/admin/pdf/download' //下载风险报告，get方式1和2代表不同pdf
    // http://localhost:8081/admin/pdf/download?type=1
}

export default API_CONFIG
