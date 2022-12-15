import '../app.css'

import React from 'react';
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

      <div align = "center" style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
      <Radio.Group defaultValue="a" size="large">
        <Radio.Button value="a">Completed Huffman HW (Happy)</Radio.Button>
        <Radio.Button value="b">545 got me down (Sad)</Radio.Button>
        <Radio.Button value="c">Doing 160 contradiction proof (Think)</Radio.Button>
        <Radio.Button value="d">262</Radio.Button>
      </Radio.Group>
      </div>

      <div className = "spotify-header" style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3>Your Pottruck favorites</h3>
        <Table dataSource={this.state.results} columns={songColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      </div>
    )
  }

}

export default SavedPage

