import '../app.css'

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

class SongsPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      happyResults: [],
      sadResults: [],
      friendResults: [],
      loading : true,
    }
  }


  componentDidMount() {

    getSongs().then(res => {
      this.setState({ happyResults: res.results[0].happy })
      this.setState({ sadResults: res.results[1].sad })
      this.setState({ friendResults: res.results[2].friends })
      this.setState({loading: false})
    })
  }

  render() {
    if(this.state.loading) {
      return <span className="Loader">
     <div className="Loader-indicator" style={{ "color" : "green", "text-align" : "center", marginTop: '45vh'}} >
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
        <h3>
          Pulling up to Smokes playlist!!
        </h3>
        <Table dataSource={this.state.happyResults} columns={songColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      <div className = "spotify-header" style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3>
          Sad songs for long VP hours...
        </h3>
        <Table dataSource={this.state.sadResults} columns={songColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
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

export default SongsPage

