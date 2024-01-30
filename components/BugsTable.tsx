"use client"

import { useMemo } from 'react';

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';''

import Link from 'next/link'

import { BugTypePRIMARY, type BugType } from '@/utils/definitions'
import { bugsFakeData } from '@/utils/placeholder-data';



const BugsTable = ({bugs, project_id} : {bugs: BugTypePRIMARY[], project_id: string}) => {

    const data = bugs

    const columns = useMemo<MRT_ColumnDef<BugTypePRIMARY>[]>(
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
                accessorKey: 'bug_id',
                header: 'Bug ID',
                size: 200,
                // enableClickToCopy: true,
            },
            {
                accessorKey: 'title',
                header: 'Title',
                size: 200,

            },
            // {
            //     accessorKey: 'description',
            //     header: 'Title',
            //     size: 200,
            // },
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
                accessorFn: (row)=> {
                    if(row.is_user_reported){
                        return "True"
                    }
                    return "False"
                },
                id: "customer_reported",
                header: 'Customer Reported',
                size: 150,
            },
            {
                accessorKey: 'creator_id',
                header: 'Creator',
                size: 150,
            },
            {
                accessorKey: 'created_at',
                header: 'Created At',
                size: 150,
            },
            // {
            //     accessorKey: 'assignees',
            //     header: 'Assignees',
            //     size: 150,
            // },
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
            
        ],
        [],
    );
      

    const table = useMaterialReactTable({
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.),
        enableRowActions: true,
        //The ! at the end tells typescript to treat this undefined as a non-null value because we are certain it will be a string as its coming from our database.
        getRowId: (originalRow) => originalRow.bug_id!,
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