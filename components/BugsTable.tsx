"use client"

import { useMemo } from 'react';

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';''

import Link from 'next/link'

import { type BugType } from '@/lib/definitions'
import { bugsFakeData } from '@/lib/placeholder-data';



const BugsTable = ({project_id} : {project_id: string}) => {

    const data = bugsFakeData

    const columns = useMemo<MRT_ColumnDef<BugType>[]>(
        () => [
            // {
            //     id: 'sendEmail',
            //     header: 'Send Email',
            //     columnDefType: 'display', //turns off data column features like sorting, filtering, etc.
            //     // enableColumnOrdering: true, //but you can turn back any of those features on if you want like this
            //     Cell: ({ row }) => (
            //         <button 
            //             className='bg-primary-green border-primary-green border-2 text-white px-2 py-1 rounded-lg hover:bg-inherit hover:text-stone-800' 
            //             onClick={() => {}}
            //         >
            //             Send Email
            //         </button>
            //     ),
            // },
            {
                accessorKey: 'id',
                header: 'Bug ID',
                size: 100,
                // enableClickToCopy: true,
            },
            {
                accessorKey: 'title',
                header: 'Title',
                size: 200,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 150,
            },
            {
                accessorKey: 'priority',
                header: 'Priority',
                size: 150,
            },
            {
                accessorKey: 'severity',
                header: 'Severity',
                size: 150,
            },
            {
                accessorKey: 'creator',
                header: 'Creator',
                size: 150,
            },
            {
                accessorKey: 'created_at',
                header: 'Created At',
                size: 150,
            },
            {
                accessorKey: 'assignees',
                header: 'Assignees',
                size: 150,
            },
            // {
            //     //accessorFn function that combines multiple data together
            //     accessorFn: (row) => {
            //         return (row.assignees.map((assignee)=>`${assignee.name}`).join(', ') )
            //     },
            //     id: 'assignees',
            //     header: 'Assignees',
            // },
            // {
            //     accessorFn(originalRow) {
                    
            //         return 'originalRow.'
            //     },
            //     id: 'assignees2',
            //     header: 'Assignees 2',
            // },
            // {
            //     accessorKey: 'customer_reported',
            //     header: 'Customer Reported',
            //     size: 150,
            // },
            {
                accessorFn: (row)=> {
                    if(row.customer_reported){
                        return "True"
                    }
                    return "False"
                },
                id: "customer_reported",
                header: 'Customer Reported',
                size: 150,
            }
        ],
        [],
    );
      

    const table = useMaterialReactTable({
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.),
        enableRowActions: true,
        getRowId: (originalRow) => originalRow.id,
        renderRowActions: ({ row }) => (
            <div>
                <Link href={`/project/${project_id}/bug/${row.id}`}>
                    <button 
                        className='bg-primary-green border-primary-green border-2 text-white px-2 py-1 rounded-lg hover:bg-inherit hover:text-stone-800' 
                        // onClick={() => {}}
                    >
                        View
                    </button>
                </Link>
                
                {/* <button 
                    className='bg-primary-green border-primary-green border-2 text-white px-2 py-1 rounded-lg hover:bg-inherit hover:text-stone-800' 
                    onClick={() => {}}
                >
                    Delete
                </button> */}
            </div>
          ),
      });



    return <MaterialReactTable table={table} />;
}

export default BugsTable