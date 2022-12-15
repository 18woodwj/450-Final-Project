import '../app.css'

import React from 'react';
import {
  Table,
  Select,
  Pagination
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getFriends } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;


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
  {
    // John this should add two entries to the Friends database: (u1, u2) and (u2, u1) based on IDs
    // you might have to look up by iD
    title: 'Add friend!',
    key: 'key',
    dataIndex: 'key',
    width: 50,
    align: 'center',
    render: (text, record) => (
     <button onClick={()=> console.log("hello")}>
       {"ADD"}
     </button>
    ),
  },
];

class FriendsPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      friendResults: [],
    }
  }
  
  componentDidMount() {

    getFriends().then(res => {
      console.log(res.results)
      this.setState({ friendResults: res.results })
    })
  }

  render() {
    return (  
      <div>
      <MenuBar />    
      <div className = "spotify-header" style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3>
          Suggested friends
        </h3>
        <Table dataSource={this.state.friendResults} columns={friendColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
        </div>
      </div>
    )
  }
}

export default FriendsPage

