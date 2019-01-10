import React,{Component} from 'react';


export default class ParamInfo extends Component {

  constructor(props) {
    super(props)
  }

  renderData(data) {
    var tempArry=[]
    for(let key in data) {
      tempArry.push({
        key:key,
        datas:data[key]
      })
    }
    return tempArry
  }



  render(){
    let values = this.props.value && this.props.value
    const submitDataList = renderData(values)
    return (
      <div>
        {
          submitDataList && submitDataList.map((item,index)=>{
            return (
              <div>
                <span>{item.key}</span>
                {
                  Array.isArray(item.datas)? (
                      item.datas.map((items,index)=>{
                        return (
                          <span>{items}</span>
                        )
                      })
                  ): (
                      <span>{item.datas}</span>
                  )
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}
