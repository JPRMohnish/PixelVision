import React from "react";
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
export default class Random extends React.Component {
    state = {
        info : {},
        loaded: false,
        taskList: [],
        taskInfoList: {},
    }
  
    async componentWillMount() {
        const ans = await axios.get('http://localhost:3000/info');
        const taskList = await axios.get('http://localhost:3000/task/list');
        this.setState({info:ans.data, loaded:true,taskList:taskList.data});
    } 
    taskInfo = async  (e) => {
        
        var uuid = e.target.innerText;
        console.log(uuid);
        uuid = uuid.toString();
        const info = await axios.get('http://localhost:3000/task/'+uuid+'/info');
        console.log(info.data);
        var til = this.state.taskInfoList;
        til[uuid] = info.data;
        const date = new Date(til[uuid].dateCreated);
        til[uuid].dateCreated = date.toLocaleString();
        til[uuid].processingTime = til[uuid].processingTime/1000 + " seconds";
        this.setState({taskInfoList:til});
    }

    render() {
        return <div style={{width:"90%",alignSelf:"center",alignItems:"center",marginLeft:20,marginTop:20}}>
            {!this.state.loaded && <CircularProgress />}
        {this.state.loaded &&
        <div>
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Available Memory</TableCell>
              <TableCell align="right">CPU Cores</TableCell>
              <TableCell align="right">Engine</TableCell>
              <TableCell align="right">Version</TableCell>
              <TableCell align="right">Engine Version</TableCell>
              <TableCell align="right">Max Images</TableCell>
              <TableCell align="right">Max Parallel Tasks</TableCell>
              <TableCell align="right">Total Memory</TableCell>
              <TableCell align="right">Task Queue Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          
              <TableRow key={this.state.info.cpuCores}>
                <TableCell component="th" scope="row">
                  {this.state.info.availableMemory}
                </TableCell>
                <TableCell align="right">{this.state.info.cpuCores}</TableCell>
                <TableCell align="right">{this.state.info.engine}</TableCell>
                <TableCell align="right">{this.state.info.version}</TableCell>
                <TableCell align="right">{this.state.info.engineVersion}</TableCell>
                <TableCell align="right">{this.state.info.maxImages || "NA"}</TableCell>
                <TableCell align="right">{this.state.info.maxParallelTasks}</TableCell>
                <TableCell align="right">{this.state.info.totalMemory}</TableCell>
                <TableCell align="right">{this.state.info.taskQueueCount}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <h2>Tasks With Info</h2>
    
        <TreeView
        
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        > {
          this.state.taskList.map((task) => (
         <TreeItem nodeId={task.uuid} label={task.uuid} onClick={this.taskInfo}>

        <Card >
      <CardActionArea>
        
        <CardContent>
        { this.state.taskInfoList[task.uuid] &&
        <Typography variant="body2" color="textSecondary" component="p">
        Date Created: {this.state.taskInfoList[task.uuid].dateCreated}<br/>
        Processing Time: {this.state.taskInfoList[task.uuid].processingTime}<br/>
        Progress: {this.state.taskInfoList[task.uuid].progress}<br/>
        Images Count: {this.state.taskInfoList[task.uuid].imagesCount}<br/>
        Status Code: {this.state.taskInfoList[task.uuid].status.code}<br/>
        {this.state.taskInfoList[task.uuid].status.errorMessage &&  <p style={{color:"red"}}>Error: {this.state.taskInfoList[task.uuid].status.errorMessage} </p>}
        </Typography> 
        }
         {
             !this.state.taskInfoList[task.uuid] &&<CircularProgress />
         }
        </CardContent>
      </CardActionArea>
    </Card>
          </TreeItem>
          ))}
          </TreeView>
      </div>
    }
      </div>
    }
}