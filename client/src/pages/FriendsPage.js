import '../app.css'

import React from 'react';
import {Container} from 'react-bootstrap'
import {
  Table,
  Select,
  Pagination
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getFriends, addFriend } from '../fetcher'
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
    title: 'Add friend!',
    key: 'key',
    dataIndex: 'key',
    width: 50,
    align: 'center',
    render: (text, record) => (
     <button onClick={()=> addFriend(record.email).then(res => {
      if (res.error) {
        console.log(res.error)
      } else {
        console.log("fuck yes")
      }
     })}>
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
      <Container className = "top"></Container>
      <div className = "spotify-header" style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3 style={{color:'green'}}>
          Suggested friends
        </h3>
        <Table className = "table-style" style={{ "border": "1px solid black" }} dataSource={this.state.friendResults} columns={friendColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
        </div>
      </div>
    )
  }
}

export default FriendsPage

