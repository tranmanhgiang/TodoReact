import React from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends React.Component {

  onOpenForm = () => {
    this.props.onOpenForm();
    this.props.onClearTask({
      id: '',
      name: '',
      status: false
    });
  }

  render() {
    var { isDisplayForm } = this.props;

    return ( 
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <TaskForm /> 
          </div>
          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary" onClick={this.onOpenForm}>
              <span className="fa fa-plus mr-5" />
              Thêm Công Việc
            </button>
            <TaskControl /> 
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList 
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
    },
    onClearTask : (task) => {
      dispatch(actions.editTask(task));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
