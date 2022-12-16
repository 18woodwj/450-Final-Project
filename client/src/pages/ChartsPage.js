import '../app.css'
import {Container} from 'react-bootstrap'
import React from 'react';
import {
  Table,
  Select,
  Pagination,
  Cell
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getCharts, putSong } from '../fetcher'
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
  {
    title: 'Add song!',
    key: 'key',
    dataIndex: 'key',
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


class ChartsPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      regionNames: [], 
      region1Results: [],
      region2Results: [],
      region3Results: [],
      userRegionResults: [],
      loading: true,
    }
  }


  componentDidMount() {

    getCharts().then(res => {

      this.setState({ regionNames: [res.results[0].regions[0].region, res.results[0].regions[1].region, res.results[0].regions[2].region] })
      this.setState({ userRegionResults: res.results[4].user_region })
      this.setState({ region1Results: res.results[1].region1 })
      this.setState({ region2Results: res.results[2].region2 })
      this.setState({ region3Results: res.results[3].region3 })
      this.setState({ loading: false })

    })
  }

  render() {
    if(this.state.loading) {
      return <span className="Loader">
     <div className="Loader-indicator" style={{ "color" : "green", "textAlign" : "center", marginTop: '45vh'}} >
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
            <h3 style={{color:'green'}}>Charting in your region!</h3>
            <Table className = "table-style" style={{ "border": "1px solid black" }} dataSource={this.state.userRegionResults} columns={chartColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
          </div>
        </Container>
        <Container className = "container-row">
          <div className = "spotify-header" style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h3 style={{color:'green'}}>Charting in {this.state.regionNames[0]}</h3>
            <Table className = "table-style" dataSource={this.state.region1Results} columns={chartColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
          </div>
          <div className = "spotify-header" style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h3 style={{color:'green'}}>Charting in {this.state.regionNames[1]}</h3>
            <Table className = "table-style" dataSource={this.state.region2Results} columns={chartColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
          </div>
          <div className = "spotify-header" style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h3 style={{color:'green'}}>Charting in {this.state.regionNames[2]}</h3>
            <Table className = "table-style" dataSource={this.state.region3Results} columns={chartColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
          </div>
        </Container>
      </div>
    )
  }
}

export default ChartsPage

