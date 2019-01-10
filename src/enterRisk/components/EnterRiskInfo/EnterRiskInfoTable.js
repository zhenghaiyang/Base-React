import React,{ Component } from 'react';
import { Table } from 'antd'





export default class EnterRiskInfoTable extends Component {



  render() {
    let columns = this.props.columns
    let datasource = this.props.datasource
    let title = this.props.titles
    return (
      <div>
        <div className="titlesName">
          {title}
        </div>
        <div>
          <Table
            dataSource={datasource}
            columns={columns}
            pagination={false}
            rowKey={record=>record.index}
            bordered={false}
          />
        </div>
      </div>
    )
  }
}
