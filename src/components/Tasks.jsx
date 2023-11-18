import React from 'react'
import Task from './Task'

const Tasks = () => {
  return (
    <div className='min-h-[100px] bg-base-200 p-2 md:p-3 rounded-lg'>
        <Task />
        <Task />
        <Task />
        <Task />
    </div>
  )
}

export default Tasks