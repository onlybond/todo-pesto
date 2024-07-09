import React from 'react'
import { Select, SelectContent, SelectItem } from './ui/select'
import { SelectTrigger, SelectValue } from './ui/select'

export const FilterDropDown = () => {
  return (
    <div className='w-full flex items-center justify-end p-4 rounded-lg gap-6'>
      <h1 className='text-lg font-semibold'>Filter By Status</h1>
      <div className='w-fit'>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder='Filter By Status' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All</SelectItem>
          <SelectItem value='todo'>Todo</SelectItem>
          <SelectItem value='inprogress'>In Progress</SelectItem>
          <SelectItem value='completed'>Completed</SelectItem>
        </SelectContent>
      </Select>
      </div>
    </div>
  )
}
