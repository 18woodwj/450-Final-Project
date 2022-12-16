import '../app.css'

import React from 'react';
import {Container} from 'react-bootstrap'
import {
  Table,
  Pagination,
  Select,
  Line
} from 'antd'

import CanvasJSReact from './canvasjs.react';
import MenuBar from '../components/MenuBar';
import { getWrapped } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


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
    dataIndex: 'percent_l',
    key: 'percent_l',
  },
  {
    title: 'Energy %',
    dataIndex: 'percent_e',
    key: 'percent_e',
  },
  {
    title: 'Danceability %',
    dataIndex: 'percent_d',
    key: 'percent_d',    
  },
  {
    title: 'Acousticness %',
    dataIndex: 'percent_a',
    key: 'percent_a',    
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
      this.setState({ artists: res[0].artists, percentiles: res[1].percentiles, avg_song_atr: res[2].avg_song_atr, chart_regions: res[3].chart_regions })
    })
  }


  render() {
    const options = {
			theme: "light1",
			animationEnabled: true,
			title:{
				text: "Your habits - wrapped!"
			},
			axisX: {
				title: "Listening habit"
			},
			axisY: {
        maximum: 1.0,
				title: "Common characteristics",
				titleFontColor: "#000000",
				lineColor: "#000000",
				labelFontColor: "#000000",
				tickColor: "#000000"
			},
			axisY2: {
        maximum: 1.1,
				title: "Friend comparison",
				titleFontColor: "#000000",
				lineColor: "#000000",
				labelFontColor: "#000000",
				tickColor: "000000"
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [{
        color: "#1DB954",
				type: "spline",
				name: "Listening attributes",
				showInLegend: true,
				dataPoints: [
					{ label: "Loudness", y: (this.state.avg_song_atr.length !== 0) ? this.state.avg_song_atr[0].avg_l : 1 },
					{ label: "Energy", y: (this.state.avg_song_atr.length !== 0) ? this.state.avg_song_atr[0].avg_e : 1 },
					{ label: "Danceability", y: (this.state.avg_song_atr.length !== 0) ? this.state.avg_song_atr[0].avg_d : 1 },
          { label: "Acousticness", y: (this.state.avg_song_atr.length !== 0) ? this.state.avg_song_atr[0].avg_a : 1 },
				]
			},
			{
        color: "#0000FF",
				type: "spline",
				name: "Friend comparison",
				axisYType: "secondary",
				showInLegend: true,
				dataPoints: [
					{ label: "Loudness", y: (this.state.percentiles.length !== 0) ? this.state.percentiles[0].percent_l : 1 },
					{ label: "Energy", y: (this.state.percentiles.length !== 0) ? this.state.percentiles[0].percent_e : 1 },
					{ label: "Danceability", y: (this.state.percentiles.length !== 0) ? this.state.percentiles[0].percent_d : 1 },
          { label: "Acousticness", y: (this.state.percentiles.length !== 0) ? this.state.percentiles[0].percent_a : 1 },
				]
			}]
		}


    return (
      <div>
        <MenuBar />
        <Container className = "top"></Container>
      <div className = "spotify-header" style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3 style={{color:'green'}}>Just how popular were your songs?</h3>
        <Table class = "table-style" style={{ "border": "1px solid black" }} dataSource={this.state.chart_regions} columns={regionColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      <div className = "spotify-header" style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3 style={{color:'green'}}>How does your taste compare to that of your friends?</h3>
        <p>This table shows which percentile your average song attribute falls into with respect to the average song attributes of your friends</p>
        <Table class = "table-style" style={{ "border": "1px solid black" }} dataSource={this.state.percentiles} columns={percentileColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      <div className = "spotify-header" style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3 style={{color:'green'}}>What are some of the common characteristics of your songs?</h3>
        <p>This table shows some of the average attribute scores of saved songs</p> 
        <Table class = "table-style" style={{ "border": "1px solid black" }} dataSource={this.state.avg_song_atr} columns={atributesColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      <div className = "spotify-header" style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3 style={{color:'green'}}>Who were your most featured artists?</h3>
        <p> This table shows your three most commonly featured artists in your saved songs</p>
        <Table class = "table-style" style={{ "border": "1px solid black" }} dataSource={this.state.artists} columns={artistsColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
      </div>
      <CanvasJSChart options = {options}
			/>


      </div>
    )
  }

}

export default WrappedPage

