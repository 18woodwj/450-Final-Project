import '../index.css'

import React from 'react';
import {
  Table,
  Select,
  Pagination,
  Cell
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getCharts } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;

const chartColumns = [
  {
    title: 'Song',
    dataIndex: 'song_name',
    key: 'song_name',
    width: 300,
  },
  {
    title: 'Artists',
    dataIndex: 'artists',
    width: 300,
    key: 'artists',    
  },
  {
    title: 'Add song!',
    key: 'key',
    dataIndex: 'key',
    width: 50,
    align: 'center',
    render: (text, record) => (
     <button onClick={()=> console.log("hello")}>
       {"+++"}
     </button>
    ),
  },
];


class ChartsPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      regionNames: [], 
      region1Results: [],
      region2Results: [],
      region3Results: [],
      userRegionResults: [],
      loading: true,
    }
  }


  componentDidMount() {

    getCharts().then(res => {

      this.setState({ regionNames: [res.results[0].regions[0].region, res.results[0].regions[1].region, res.results[0].regions[2].region] })
      this.setState({ userRegionResults: res.results[4].user_region })
      this.setState({ region1Results: res.results[1].region1 })
      this.setState({ region2Results: res.results[2].region2 })
      this.setState({ region3Results: res.results[3].region3 })
      this.setState({ loading: false })

    })
  }

  render() {
    if(this.state.loading) {
      return <span className="Loader">
     <div className="Loader-indicator" >
       <h1>
         <span>Chugging away... Your songs are loading...</span>
         <span className="Loader-ellipsis" >
           <span className="Loader-ellipsisDot">.</span>
           <span className="Loader-ellipsisDot">.</span>
           <span className="Loader-ellipsisDot">.</span>
         </span>
       </h1>
     </div>
   </span>
   }

    return (      
      <div>
        <MenuBar />
      <div className = "spotify-header" style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3>Charting in your region!</h3>
        <Table style={{width: '100%', justifyContent: 'center'}} dataSource={this.state.userRegionResults} columns={chartColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      <div className = "spotify-header" style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3>Charting in {this.state.regionNames[0]}</h3>
        <Table dataSource={this.state.region1Results} columns={chartColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      <div className = "spotify-header" style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3>Charting in {this.state.regionNames[1]}</h3>
        <Table dataSource={this.state.region2Results} columns={chartColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      <div className = "spotify-header" style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3>Charting in {this.state.regionNames[2]}</h3>
        <Table dataSource={this.state.region3Results} columns={chartColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      </div>
    )
  }
}

export default ChartsPage

