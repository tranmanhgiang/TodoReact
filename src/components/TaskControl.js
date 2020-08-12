import React from 'react';
import TaskSearchControl from './TaskSearchControl';
import TaskSortControl from './TaskSortControl';

class TaskControl extends React.Component {
    render() {
        return (
            <div className="row mt-15">
                <TaskSearchControl onSearch = { this.props.onSearch } />
                <TaskSortControl onSort={ this.props.onSort }/>
            </div>
        );
    }
}

export default TaskControl;