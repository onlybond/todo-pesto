import React, { FormEvent } from 'react'
import { Select, SelectContent, SelectItem } from './ui/select'
import { SelectTrigger, SelectValue } from './ui/select'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { updateFilter } from '@/lib/store/features/todos/todosSlice'

export const Filter = () => {
  const dispatch = useAppDispatch()
  const handleFilterChange = (e:string)=>{
    const filter = e
    dispatch(updateFilter(filter))
  }
  return (
    <div className='w-full flex items-center p-4 rounded-lg gap-6'>
      <h1 className='text-lg font-semibold'>Filter By Status</h1>
      <div className='w-fit'>
      <Select onValueChange={(e)=>handleFilterChange(e)}>
        <SelectTrigger>
          <SelectValue placeholder='Filter By Status' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem  value='all'>All</SelectItem>
          <SelectItem value='todo'>Todo</SelectItem>
          <SelectItem value='inprogress'>In Progress</SelectItem>
          <SelectItem value='completed'>Completed</SelectItem>
        </SelectContent>
      </Select>
      </div>
    </div>
  )
}
