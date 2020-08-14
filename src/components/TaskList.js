import React from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1 // all : -1, active : 1 , deactive : 0
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        var filter = {
            name: name === 'filterName' ? value : this.state.filterName,
            status: name === 'filterStatus' ? value : this.state.filterStatus
        };

        this.props.onFilterTable(filter);
        this.setState({
            [name] : value
        });
    }

    render() {
        var { tasks, filterTable, keyword, sort } = this.props;
        if(filterTable) {
            if(filterTable.name) {
              tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1;
              });
            }
            tasks = tasks.filter((task) => {
              if(filterTable.status === -1) {
                return task;
              } else {
                return task.status === (filterTable.status === 1 ? true : false);
              }
            });
        }
        if(keyword) {
            tasks = tasks.filter((task) => {
              return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
            });
        }

        if(sort.by === 'name') {
            tasks.sort((a, b) => {
              if(a.name > b.name) return sort.value;
              else if(a.name < b.name) return -sort.value;
              else return 0;
            });
          } else {
            tasks.sort((a, b) => {
              if(a.status > b.status) return -sort.value;
              else if(a.status < b.status) return sort.value;
              else return 0;
            });
          }
        var eleTasks = tasks.map((task, index) => {
            return <TaskItem
                key = {index}
                task = {task}
                index = {index}
            />
        })
        return (
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng Thái</th>
                    <th className="text-center">Hành Động</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td />
                    <td>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="filterName"
                        value={filterTable.name}
                        onChange={this.onChange}/>
                    </td>
                    <td>
                    <select 
                        className="form-control"
                        name="filterStatus"
                        value={filterTable.status}
                        onChange={this.onChange}>
                            <option value={-1}>Tất Cả</option>
                            <option value={0}>Ẩn</option>
                            <option value={1}>Kích Hoạt</option>
                    </select>
                    </td>
                    <td />
                </tr>
                
                {eleTasks}
                
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks : state.tasks,
        filterTable : state.filterTable,
        keyword : state.search,
        sort : state.sort
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable : (filter) => {
            dispatch(actions.filterTask(filter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);