import React from 'react'
import CustomCard from '../components/Custom/Card/card'
import { Button } from '@/components/ui/button'
import { CheckCheck, PenOff, Plus, Send, ToggleRight } from 'lucide-react'
import { DataTable } from '../components/Custom/DataTable/data-table'
import { columns } from './column'

const page = () => {
  return (
    <div>
        <CustomCard title="User and Roles">
            <div>
                <div className='flex'>
                    <div className='flex justify-start space-x-1'>
                        <Button variant="outline" > <CheckCheck size={14} className='me-[2px]'/> All</Button>
                        <Button variant="outline" ><Send size={14} className='me-[2px]'/> Invited</Button>
                        <Button variant="outline" ><ToggleRight size={14} className='me-[2px]'/> Disabled</Button>
                        <Button variant="outline" ><PenOff size={14} className='me-[2px]'/> Resticted</Button>   
                    </div>
                    <Button className=" ms-auto" variant="outline" ><Plus size={14} className='me-[2px]'/> Add Users</Button>
                </div>
                <div>
                    <DataTable columns={columns} data={{}}/>
                </div>
            
            </div>
        </CustomCard>
    </div>
  )
}

export default page