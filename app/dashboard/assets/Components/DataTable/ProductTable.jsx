/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { ArrowUpDown, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import ProductUpdateSheet from "../ProductUpdateSheet";

export function ProductTable({ data, width, loading, onUpdate, onDelete }) {
  const [sorting, setSorting] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState([]);

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "code",
      cell: ({ row }) => {
        const product = row.original.product;
        return (
          <div className="flex flex-wrap gap-1">
            <span>{product?.code}</span>
          </div>
        );
      },
      header: "Code",
    },
    {
      accessorKey: "name",
      cell: ({ row }) => {
        const product = row.original.product;
        return (
          <div className="flex flex-wrap gap-1">
            <span>{product?.name}</span>
          </div>
        );
      },
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      header: "Product Name",
    },
    {
      accessorKey: "main_category",
      cell: ({ row }) => {
        const main_category = row.original.product.main_category;
        return (
          <div className="flex flex-wrap gap-1">
            <span>{main_category?.name}</span>
          </div>
        );
      },
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Main Category
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      header: "Main Category",
    },
    {
      accessorKey: "sub_category",
      cell: ({ row }) => {
        const sub_category = row.original.product.sub_category;
        return (
          <div className="flex flex-wrap gap-1">
            <span>{sub_category?.name}</span>
          </div>
        );
      },
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Sub Category
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      header: "Sub Category",
    },
    {
      accessorKey: "description",
      cell: ({ row }) => {
        const product = row.original.product;
        return (
          <div className="flex flex-wrap gap-1">
            <span>{product?.description}</span>
          </div>
        );
      },
      header: "Description",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },

    {
      accessorKey: "low_stock_threshold",
      cell: ({ row }) => {
        const product = row.original.product;
        return (
          <div className="flex flex-wrap gap-1">
            <span>{product?.low_stock_threshold}</span>
          </div>
        );
      },
      header: "Threshold",
    },

    {
      id: "actions",
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const product = row.original;
        const [open, setOpen] = React.useState(false);
        const [OpenModal, setOpenModal] = React.useState(false);
        const [productData, setproductData] = React.useState(null);

        const handleDelete = async () => {
          try {
            await axios.delete(
              `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/${product.id}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            onDelete(product.id);
            // Optionally, you can call a function to refresh the table data here
          } catch (error) {
            console.error("Failed to delete:", error);
          }
          setOpen(false); // Close dialog after action
        };

        const handleUpdate = () => {
          // Pass the entire office object to the modal
          setOpenModal(true);
          // Set the office data that you want to update
          setproductData(product); // Create a state variable to hold the office data
        };

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setOpen(true)}>
                  <Trash2 size={16} className="me-2" /> Delete
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleUpdate}>
                  <Pencil size={16} className="me-2" />
                  Update
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    product from the servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setOpen(false)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <ProductUpdateSheet
              existingProduct={productData}
              openSheet={OpenModal}
              setopenSheet={setOpenModal}
            />

            {/* <AddOfficeModal onUpdate={onUpdate}  existingOffice={officeData} OpenModal={OpenModal} setOpenModal={setOpenModal} /> */}
          </>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div className={`${width}`}>
      <div className="bg-card my-3 md:my-3 dark:bg-accent rounded-lg w-full">
        <div className="flex">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter products"
              value={table.getColumn("name")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
        </div>
        <div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  className="border-b-gray-400 dark:border-b-gray-500 border-opacity-100"
                  key={headerGroup.id}
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center h-12"
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className="border-white border-opacity-10"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-12 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex flex-wrap items-center space-x-2">
            <span className="text-sm">Rows per page: </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="border rounded-md p-1"
            >
              {[5, 10, 20, 50].map((pageSize) => (
                <option
                  className="bg-secondary"
                  key={pageSize}
                  value={pageSize}
                >
                  {pageSize}
                </option>
              ))}
            </select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <span className="text-xs">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
