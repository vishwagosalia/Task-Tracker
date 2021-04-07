import Task from './Task'

const Tasks = ({ tasksarr, onDelete, onToggle }) => {
    return (
        <>
            {tasksarr.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
            ))}
        </>
    )
}

export default Tasks
