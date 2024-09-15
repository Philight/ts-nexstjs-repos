'use client';

import { cn } from '@lib/utils';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';

import { Button } from '@components/action/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/list/Table';

// ============================================================================

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data, loading, className, pagination, onPage }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // ============================================================================

  return (
    <div className={cn(className, 'data-table__c rounded-md border box-border px-3.5 md:px-8 py-3 md:py-4 shadow-2xl bg-base-300')}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                Loading
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          // onClick={() => table.previousPage()}
          // onClick={() => onPage(pagination?.startCursor)}
          onClick={() => onPage('prev')}
          disabled={!pagination.hasPreviousPage}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          // onClick={() => table.nextPage()}
          // onClick={() => onPage(pagination?.endCursor)}
          onClick={() => onPage('next')}
          disabled={!pagination.hasNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
