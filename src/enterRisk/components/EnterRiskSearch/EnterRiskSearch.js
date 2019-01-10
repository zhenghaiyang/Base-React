import React, {Component} from 'react'
import {Form, Row, Col, Input, Button, DatePicker, Select, message} from 'antd'
import 'antd/dist/antd.css';
import API_CONFIG from '../../api.js';
const utils = require("../../../../utils")
const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class EnterRiskSearch extends Component {
    constructor(props) {
        super(props);
        this.reset = this.reset.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.disabledStartDate = this.disabledStartDate.bind(this);
        this.disabledEndDate = this.disabledEndDate.bind(this);
        this.onExport = this.onExport.bind(this);
    }

    // 重置输入框的值
    reset() {
        this.props.form.resetFields();
        this.props.form.setFieldsValue({decisionResult: undefined})
        let params = {}
        params.pageSize = 10; // 每页多少条
        params.pageNum = 1;// 请求第几页
        params.decisionResult = '10032' // 默认拒绝
        const searchData = this.props.datasource.searchData
        let submitObj = Object.assign(searchData, params)
        this.props.getEnterRiskListFN(submitObj)
        this.props.updateSearchDataFN(submitObj)
    }

    // 设置开始日期不能大于结束日期
    disabledStartDate(startTime) {
        const endValue = this.props.form.getFieldValue("endTime");
        if (!startTime || !endValue) {
            return false;
        }
        return startTime.valueOf() >= endValue.valueOf();
    }

    // 设置结束日期不能小于开始日期
    disabledEndDate(endValue) {
        const startValue = this.props.form.getFieldValue("startTime");
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    //提交
    onSearch(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let params = {}
                params.pageSize = 10; // 每页多少条
                params.pageNum = 1;// 请求第几页
                // params.decisionResult='10032' // 默认拒绝
                if (Date.parse(values.startTime) > Date.parse(values.endTime)) {
                    message.error("结束时间不能大于开始时间!")
                    return;
                }
                if (values.startTime) {
                    // params.startTime = utils.timestampToString(Date.parse(values.startTime))// 开始时间
                    //params.startTime=new Date(values.startTime)// 开始时间
                    params.startTime = values.startTime.format("YYYY-MM-DD HH:mm:ss")// 开始时间

                }
                if (values.endTime) {
                    // params.endTime = utils.timestampToString(Date.parse(values.endTime)) // 结束时间
                    //params.endTime=new Date(values.endTime) // 结束时间
                    params.endTime = values.endTime.format("YYYY-MM-DD HH:mm:ss") // 结束时间

                }
                const searchData = this.props.datasource.searchData
                //console.log(Object.assign(searchData,values,params))
                let submitObj = Object.assign(searchData, values, params)
                this.props.getEnterRiskListFN(submitObj)
                this.props.updateSearchDataFN(submitObj)
            }
        });
    }

    // 按条件查询并导出结果到excel
    onExport(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var tempObj = {}
                var count = 0
                let objLength = Object.getOwnPropertyNames(values).length;
                for (let i in values) {
                    if (values[i] == undefined || values[i] == "") {
                        ++count
                    }
                }
                if (count == objLength) {
                    message.error("请选择条件后再进行查询导出!")
                    return;
                }
                for (let i in values) {
                    tempObj[i] = values[i]
                }
                if(values.startTime) {
                  tempObj.startTime=utils.timestampToStringHMMS(Date.parse(values.startTime))// 开始时间
                }
                if(values.endTime) {
                  tempObj.endTime=utils.timestampToStringHMMS(Date.parse(values.endTime)) // 结束时间
                }
                let subObj = JSON.stringify(tempObj)
                let submitUrl = `${API_CONFIG.ENTERRISK_GET_EXPORT}?jsonStr=` + subObj;
                window.location.href = encodeURI(submitUrl)
            }
        })
    }


    render() {
        let prodoctnamelist = this.props.datasource && this.props.datasource.prodoctNameList && this.props.datasource.prodoctNameList.result
        let typesList = this.props.datasource && this.props.datasource.typesList && this.props.datasource.typesList.result
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 17},
            },
        };
        return (
            <Form className="whiteSearch">
                <Row>
                    <Col span={20}>
                        <Row>
                            <Col span={10}>
                                <FormItem
                                    label="进件日期"
                                    {...formItemLayout}
                                >
                                    <Col span={11}>
                                        <FormItem>
                                            {getFieldDecorator("startTime",{
                                               })(
                                                 <DatePicker placeholder="请选择时间"  showTime format="YYYY-MM-DD HH:mm:ss" disabledDate={this.disabledStartDate} />
                                               )}
                                        </FormItem>
                                    </Col>
                                    <Col span={2}>
                    <span style={{display: 'inline-block', width: '100%', textAlign: 'center'}}>
                      -
                    </span>
                                    </Col>
                                    <Col span={11}>
                                        <FormItem>
                                            
                                             {getFieldDecorator("endTime",{
                                                })(
                                                  <DatePicker placeholder="请选择时间"  showTime format="YYYY-MM-DD HH:mm:ss" disabledDate={this.disabledEndDate} />
                                                )}
                                        </FormItem>
                                    </Col>
                                </FormItem>
                            </Col>
                            <Col span={7}>
                                <FormItem
                                    label="业务条线名称"
                                    labelCol={{
                                        xs: {span: 24},
                                        sm: {span: 8},
                                    }}
                                    wrapperCol={{
                                        xs: {span: 24},
                                        sm: {span: 15},
                                    }}
                                >
                                    {getFieldDecorator("productCode", {})(
                                        <Select placeholder="请选择">
                                            {
                                                prodoctnamelist && prodoctnamelist.map((data, index) => {
                                                    return (
                                                        <Option value={data.productCode}
                                                                key={`${data.productCode}`}>{data.productName}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={7}>
                                <FormItem
                                    label="决策结果"
                                    labelCol={{
                                        xs: {span: 24},
                                        sm: {span: 7},
                                    }}
                                    wrapperCol={{
                                        xs: {span: 24},
                                        sm: {span: 17},
                                    }}
                                >
                                    {getFieldDecorator("decisionResult", {
                                        initialValue: "10032"
                                    })(
                                        <Select placeholder="请选择">
                                            {
                                                typesList && typesList.map((data, index) => {
                                                    return (
                                                        <Option value={data.code} key={`data.code`}>{data.name}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={10}>
                                <FormItem
                                    label="姓名"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator("inputName", {})(
                                        <Input placeholder="请输入姓名" maxLength="19"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={7}>
                                <FormItem
                                    label="手机号"
                                    labelCol={{
                                        xs: {span: 24},
                                        sm: {span: 8},
                                    }}
                                    wrapperCol={{
                                        xs: {span: 24},
                                        sm: {span: 15},
                                    }}
                                >
                                    {getFieldDecorator("inputCell", {})(
                                        <Input placeholder="请输入手机号" maxLength="19"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={7}>
                                <FormItem
                                    label="证件号"
                                    labelCol={{
                                        xs: {span: 24},
                                        sm: {span: 7},
                                    }}
                                    wrapperCol={{
                                        xs: {span: 24},
                                        sm: {span: 17},
                                    }}
                                >
                                    {getFieldDecorator("inputIdcard", {})(
                                        <Input placeholder="请输入证件号" maxLength="19"/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={4} style={{textAlign: 'center'}}>
                        <Button type="primary" onClick={this.onSearch} className="searchBtn">查询</Button>
                        <Button style={{marginLeft: '10px',marginBottom:"15px"}} className="searchReset" onClick={this.reset}>重置</Button>
                        <br />
                        <Button onClick={this.onExport} className="searchReset" style={{padding:"0 24px",width:"auto"}}>查询并导出结果</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}
