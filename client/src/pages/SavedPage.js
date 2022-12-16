import '../app.css'

import React from 'react';
import {Container} from 'react-bootstrap'
import {
  Table,
  Select,
  Pagination,
  Radio
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getSaved } from '../fetcher'
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

class SavedPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      results: [],
    }
  }

  componentDidMount() {
    getSaved("happy").then(res => {
      this.setState({ results: res.results })
    })
  }

  render() {

    return (   
         
      <div>
        <MenuBar />

      <div align = "center" style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
      <Radio.Group defaultValue="a" size="large">
        <Radio.Button value="a" onChange={(e)=> getSaved("").then(res => {this.setState({ results: res.results })})}>All</Radio.Button>
        <Radio.Button value="b" onChange={(e)=> getSaved("happy").then(res => {this.setState({ results: res.results })})}>Completed Huffman HW (Happy)</Radio.Button>
        <Radio.Button value="c" onChange={(e)=> getSaved("sad").then(res => {this.setState({ results: res.results })})}>262 (Sad)</Radio.Button>
        <Radio.Button value="d" onChange={(e)=> getSaved("think").then(res => {this.setState({ results: res.results })})}>Thinking of contradiction proof (Think)</Radio.Button>
        <Radio.Button value="e" onChange={(e)=> getSaved("dance").then(res => {this.setState({ results: res.results })})}>Working in neo4j (Dance)</Radio.Button>
      </Radio.Group>
      </div>

      <div className = "spotify-header" style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3 style={{color:'green'}}>Your Pottruck favorites</h3>
        <Table dataSource={this.state.results} columns={songColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      </div>
    )
  }

}

export default SavedPage