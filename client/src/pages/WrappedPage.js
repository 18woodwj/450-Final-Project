import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getWrapped } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;


const regionColumns = [
  {
    title: 'Song',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Regions Charted In',
    dataIndex: 'num_regions',
    key: 'num_regions',
  },
  {
    title: 'Top Rank',
    dataIndex: 'min_rank',
    key: 'min_rank',    
  },

];

const percentileColumns = [
  {
    title: 'Loudness %',
    dataIndex: 'avg_l',
    key: 'avg_l',
  },
  {
    title: 'Energy %',
    dataIndex: 'avg_e',
    key: 'avg_e',
  },
  {
    title: 'Danceability %',
    dataIndex: 'avg_d',
    key: 'avg_d',    
  },
  {
    title: 'Acousticness %',
    dataIndex: 'avg_a',
    key: 'avg_a',    
  },


];
const artistsColumns = [
  {
    title: 'Artist',
    dataIndex: 'main_artist',
    key: 'main_artist',
  },
  {
    title: 'Songs Featured',
    dataIndex: 'num',
    key: 'num',
  },

];
const atributesColumns = [
  {
    title: 'Avg Loudness',
    dataIndex: 'avg_l',
    key: 'avg_l',
  },
  {
    title: 'Avg Energy',
    dataIndex: 'avg_e',
    key: 'avg_e',
  },
  {
    title: 'Avg Danceability',
    dataIndex: 'avg_d',
    key: 'avg_d',    
  },
  {
    title: 'Avg Acousticness',
    dataIndex: 'avg_a',
    key: 'avg_a',    
  },

];

class WrappedPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      artists: [],
      percentiles: [],
      avg_song_atr: [],
      chart_regions: [],
      pagination: null  
    }

  }


  // Populate data
  componentDidMount() {
    getWrapped().then(res => {
      this.setState({ artists: res[0].artists})
      this.setState({ percentiles: res[1].percentiles})
      this.setState({ avg_song_atr: res[2].avg_song_atr })
      this.setState({ chart_regions: res[3].chart_regions })
    })

 
  }


  render() {

    return (
      <div>
        <MenuBar />
      <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3>Just how popular were your songs?</h3>
        <Table dataSource={this.state.chart_regions} columns={regionColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3>How does your taste compare to that of your friends?</h3>
        <Table dataSource={this.state.percentiles} columns={percentileColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3>What are some of the common characteristics of your songs?</h3>
        <Table dataSource={this.state.avg_song_atr} columns={atributesColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3>Who were your most featured artists?</h3>
        <Table dataSource={this.state.artists} columns={artistsColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>


      </div>
    )
  }

}

export default WrappedPage

