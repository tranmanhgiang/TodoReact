import React from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name : '',
      status: false
    }
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name] : value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAddTask(this.state);
    this.onClear();
    this.onCloseForm();
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  }

  onClear = () => {
    this.setState({
      name: '',
      status: false
    })
  }

  componentWillMount() {
    var { task } = this.props;
    if(task) {
      this.setState({
        id: task.id,
        name: task.name,
        status: task.status
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.task) {
        this.setState({
            id: nextProps.task.id,
            name: nextProps.task.name,
            status: nextProps.task.status,
        });
    } else if (!nextProps.task) {
        this.setState({
            id: "",
            name: "",
            status: false,
        });
    }
  }

  render() {
    var { id } = this.state;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            { !id ? 'Thêm Công Việc' : 'Chỉnh sửa công việc'}
            <span className="fa fa-times-circle pull-right" onClick={this.onCloseForm}></span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Tên :</label>
              <input 
                type="text" 
                className="form-control" 
                name="name"
                value = {this.state.name}
                onChange={this.onChange}
                />
            </div>
            <label>Trạng Thái :</label>
            <select 
              className="form-control" 
              required="required"
              name="status"
              value = {this.state.status}
              onChange={this.onChange}>
                <option value={true}>Kích Hoạt</option>
                <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                { !id ? 'Thêm' : 'Cập nhật' }
              </button>
              &nbsp;
              <button 
                type="button" 
                className="btn btn-danger"
                onClick={this.onClear}>
                  Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
          
    );    
  }
  
}

const mapStateToProps = state => {
  return {

  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddTask : (task) => {
      dispatch(actions.addTask(task)); 
    },
    onCloseForm : () => {
      dispatch(actions.closeForm());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
