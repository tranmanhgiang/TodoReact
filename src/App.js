import React from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      taskEditing : null,
      filter : {
        name: '',
        status: -1
      },
      keyword : '',
      sort: {
        by: 'name',
        value: 1
      }
    };
  }

  onOpenForm = () => {
    this.props.onOpenForm();
  }

  onUpdateStatus = (id) => {
    const { tasks } = this.state;
    const newTask = tasks.map(task => {
      if(task.id === id) {
        task.status = !task.status;
      }
      return task;
    });
    this.setState({tasks:newTask});
    localStorage.setItem('tasks',JSON.stringify(newTask));
  }

  onDelete = (id) => {
    const { tasks } = this.state;
    const newTask = tasks.filter(task => task.id !== id);
    this.setState({tasks: newTask});
    localStorage.setItem('tasks',JSON.stringify(newTask));
  }

  onUpdate = (id) => {
    const { tasks } = this.state;
    var index = -1;
    tasks.forEach((task, i) => {
      if(task.id === id) {
        index = i;
      }
      return index;
    });
    var taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing
    });
    this.onShowForm();
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus);
    this.setState({
      filter : {
        name : filterName,
        status : filterStatus
      }
    });
  }

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword
    });
  }

  onSort = (sort) => {
    this.setState({
      sort: {
        by: sort.by,
        value: sort.value
      }
    });
  }

  render() {
    var { taskEditing, filter, keyword, sort } = this.state;
    var { isDisplayForm } = this.props;
    // if(filter) {
    //   if(filter.name) {
    //     tasks = tasks.filter((task) => {
    //       return task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1;
    //     });
    //   }
    //   tasks = tasks.filter((task) => {
    //     if(filter.status === -1) {
    //       return task;
    //     } else {
    //       return task.status === (filter.status === 1 ? true : false);
    //     }
    //   });
    // }
    // if(keyword) {
    //   tasks = tasks.filter((task) => {
    //     return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    //   });
    // }

    // if(sort.by === 'name') {
    //   tasks.sort((a, b) => {
    //     if(a.name > b.name) return sort.value;
    //     else if(a.name < b.name) return -sort.value;
    //     else return 0;
    //   });
    // } else {
    //   tasks.sort((a, b) => {
    //     if(a.status > b.status) return -sort.value;
    //     else if(a.status < b.status) return sort.value;
    //     else return 0;
    //   });
    // }

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {isDisplayForm ? <TaskForm task={taskEditing} /> : ''} 
          </div>
          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary" onClick={this.onOpenForm}>
              <span className="fa fa-plus mr-5" />
              Thêm Công Việc
            </button>
            <TaskControl 
              onSearch={ this.onSearch }
              onSort={ this.onSort }/> 
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList 
                  onUpdateStatus = {this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );    
  }
}

const mapStateToProps = state => {
  return {
    isDisplayForm : state.isDisplayForm
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onOpenForm : () => {
      dispatch(actions.openForm());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
