import '../index.css'

import React from 'react';
import {
  Table,
  Select,
  Pagination
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getSongs } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;

const songColumns = [
  {
    title: 'Song',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Artists',
    dataIndex: 'artists',
    key: 'artists',
  },
  {
    title: 'Album',
    dataIndex: 'album',
    key: 'album',
  },
  {
    title: 'Duration',
    dataIndex: 'Duration',
    key: 'Duration',    
  },

];

const friendColumns = [
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Dance dif.',
    dataIndex: 'd_dif',
    key: 'd_dif',
  },
  {
    title: 'Energy dif.',
    dataIndex: 'e_dif',
    key: 'e_dif',
  },
  {
    title: 'Loudness dif.',
    dataIndex: 'l_dif',
    key: 'l_dif',
  },
  {
    title: 'Acousticness dif.',
    dataIndex: 'a_dif',
    key: 'a_dif',
  },
  {
    title: 'Total distance',
    dataIndex: 'total_distance',
    key: 'total_distance',
  },

];

class SongsPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      happyResults: [],
      sadResults: [],
      friendResults: []
    }
  }


  componentDidMount() {

    getSongs().then(res => {
      this.setState({ happyResults: res.results[0].happy })
      this.setState({ sadResults: res.results[1].sad })
      this.setState({ friendResults: res.results[2].friends })
    })
  }

  render() {

    return (      
      <div>
        <MenuBar />
      <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3>Pulling up to Smokes playlist!!</h3>
        <Table dataSource={this.state.happyResults} columns={songColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3>Sad songs for long VP hours...</h3>
        <Table dataSource={this.state.sadResults} columns={songColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3>Suggested friends</h3>
        <Table dataSource={this.state.friendResults} columns={friendColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      </div>
    )
  }

}

export default SongsPage

