'use client'
import React from 'react'
import CustomCard from '../components/Custom/Card/card'
import { Button } from '@/components/ui/button'
import { CheckCheck, PenOff, Plus, Send, ToggleRight } from 'lucide-react'
import { DataTable } from '../components/Custom/DataTable/data-table'
import { columns } from './column'
import Breadcrumbs from '../components/Custom/Breadcrumb/Breadcrumbs'
import UsersModal from './Add-Edit-Users'

const page = () => {
  return (
    <div>
        <div className="flex ">
        {" "}
        <Breadcrumbs />
        
      </div>
        <CustomCard title="User and Roles" description="Manage your team members and their account permissions here">
            <div>
                <div className='flex'>
                    <div className='flex justify-start space-x-1'>
                        <Button variant="outline" > <CheckCheck size={14} className='me-[2px]'/> All</Button>
                        <Button variant="outline" ><Send size={14} className='me-[2px]'/> Invited</Button>
                        <Button variant="outline" ><ToggleRight size={14} className='me-[2px]'/> Disabled</Button>
                        <Button variant="outline" ><PenOff size={14} className='me-[2px]'/> Resticted</Button>   
                    </div>
                    <div className='ms-auto'>
                    <UsersModal/>
                    </div>
                    {/* <Button className=" ms-auto" variant="outline" ><Plus size={14} className='me-[2px]'/> Add Users</Button> */}
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