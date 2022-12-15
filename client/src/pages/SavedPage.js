import '../app.css'

import React from 'react';
import {
  Table,
  Select,
  Pagination
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

class SavedPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      results: [],
    }
  }

  componentDidMount() {
    getSaved().then(res => {
      this.setState({ results: res.results })
    })
  }

  render() {

    return (      
      <div>
        <MenuBar />
      <div className = "spotify-header" style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3>Your Pottruck favorites</h3>
        <Table dataSource={this.state.results} columns={songColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      </div>
    )
  }

}

export default SavedPage

