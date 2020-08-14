import React from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskItem extends React.Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
    }
    
    onEditTask = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task);
    }

    render() {
        var { task,index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                <span 
                    className={task.status ? 'label label-success' : 'label label-default'}
                    onClick={this.onUpdateStatus}>
                        {task.status ? 'Kich hoat' : 'An'}
                </span>
                </td>
                <td className="text-center">
                <button 
                    type="button" 
                    className="btn btn-warning"
                    onClick={this.onEditTask}>
                        <span className="fa fa-pencil mr-5" />
                        Sửa
                </button>
                &nbsp;
                <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick = {this.onDelete}>
                        <span className="fa fa-trash mr-5" />
                        Xóa
                </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks : state.tasks
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus : (id) => {
            dispatch(actions.onUpdateStatus(id));
        },
        onDelete : (id) => {
            dispatch(actions.onDelete(id));
        },
        onOpenForm : () => {
            dispatch(actions.openForm());
        },
        onEditTask : (task) => {
            dispatch(actions.editTask(task));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);