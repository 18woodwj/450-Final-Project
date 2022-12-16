import '../app.css'

import { useHistory } from 'react-router-dom';
import { putSong } from '../fetcher'



import React from 'react';
import {Container} from 'react-bootstrap'
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
     <button onClick={()=> putSong(record.artists, record.name).then(res => {
      if (res.error) {
        console.log(res.error)
      } else {
        console.log("fuck yes");
        // do something here to display a message on the screen


      }

     })}>
       {"+++"}
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
      loading : true,
      songToAdd: []
    }
  }


  componentDidMount() {

    getSongs().then(res => {
      this.setState({ happyResults: res.results[0].happy })
      this.setState({ sadResults: res.results[1].sad })
      this.setState({loading: false})
    })
    

 }
    

  render() {
    if(this.state.loading) {
      return <span className="Loader">
     <div className="Loader-indicator" style={{ "color" : 'green', "textAlign" : "center", marginTop: '45vh'}} >
       <h1 style={{color:'green'}}>
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
        <Container className = "container-row">
          <div className = "spotify-header" style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h3 style={{color:'green'}}>
              Pulling up to Smokes playlist!!
            </h3>
            <Table dataSource={this.state.happyResults} columns={songColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
          </div>
          <div className = "spotify-header" style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h3 style={{color:'green'}}>
              Sad songs for long VP hours...
            </h3>
            <Table dataSource={this.state.sadResults} columns={songColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
          </div>
          </Container>
      </div>
    )
  }

}

export default SongsPage

