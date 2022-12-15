import '../index.css'

import React from 'react';
import {
  Table,
  Select,
  Pagination
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
  },
  {
    title: 'Artists',
    dataIndex: 'artists',
    key: 'artists',    
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
      userRegionResults: []
    }
  }


  componentDidMount() {

    getCharts().then(res => {
      console.log(res.results[0].regions[1].region)

      this.setState({ regionNames: [res.results[0].regions[0].region, res.results[0].regions[1].region, res.results[0].regions[2].region] })
      this.setState({ userRegionResults: res.results[4].user_region })
      this.setState({ region1Results: res.results[1].region1 })
      this.setState({ region2Results: res.results[2].region2 })
      this.setState({ region3Results: res.results[3].region3 })

    })
  }

  render() {

    return (      
      <div>
        <MenuBar />
      <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3>Charting in the user's region!</h3>
        <Table dataSource={this.state.userRegionResults} columns={chartColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3>Charting in {this.state.regionNames[0]}</h3>
        <Table dataSource={this.state.region1Results} columns={chartColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3>Charting in {this.state.regionNames[1]}</h3>
        <Table dataSource={this.state.region2Results} columns={chartColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3>Charting in {this.state.regionNames[2]}</h3>
        <Table dataSource={this.state.region3Results} columns={chartColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      </div>
    )
  }
}

export default ChartsPage

