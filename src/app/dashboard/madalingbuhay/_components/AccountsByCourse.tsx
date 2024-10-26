"use client";

import React, { useState, useEffect } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  RowSelectionState,
} from "@tanstack/react-table";
import { ChevronDown, Eye, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { StudentInfo } from "@/types";

interface AccountsData {
  course: string;
  account_count: number;
  accounts: StudentInfo[];
}

interface AccountsByCourseProps {
  courseShortName: string;
}

interface DataTableProps {
  data: StudentInfo[];
  columns: ColumnDef<StudentInfo>[];
  title: string;
  onMoveRows: (rowIndices: number[]) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  title,
  onMoveRows,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    enableRowSelection: true,
  });

  const handleMoveSelected = () => {
    const selectedIndices = Object.entries(rowSelection)
      .filter(([_, isSelected]) => isSelected)
      .map(([index]) => parseInt(index));

    if (selectedIndices.length > 0) {
      onMoveRows(selectedIndices);
      setRowSelection({});
    }
  };

  const selectedRowCount = Object.values(rowSelection).filter(Boolean).length;
  const totalRowCount = table.getFilteredRowModel().rows.length;

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle>
              {title} ({totalRowCount})
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {selectedRowCount} of {totalRowCount} row(s) selected
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {selectedRowCount > 0 && (
              <Button onClick={handleMoveSelected}>
                Move Selected {selectedRowCount > 1 ? "Rows" : "Row"}
              </Button>
            )}
            <Input
              placeholder="Search names..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-auto h-[calc(100%-8rem)]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
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
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
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
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const AccountsByCourse: React.FC<AccountsByCourseProps> = ({
  courseShortName,
}) => {
  const [accountsData, setAccountsData] = useState<AccountsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAccounts, setSelectedAccounts] = useState<StudentInfo[]>([]);
  const [unselectedAccounts, setUnselectedAccounts] = useState<StudentInfo[]>(
    []
  );

  const columns: ColumnDef<StudentInfo>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "avatar",
      header: "Image",
      cell: ({ row }) => (
        <img
          width="24"
          src={row.original.cropped_avatar_url || "/images/def-avatar.svg"}
          alt={row.original.cropped_avatar_url ? "avatar" : "default avatar"}
          className="rounded-full"
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "fullName",
      header: "Name",
      cell: ({ row }) =>
        `${row.original.last_name}, ${row.original.first_name} ${row.original.middle_name}`,
      sortingFn: (rowA, rowB) => {
        const aName =
          `${rowA.original.last_name}, ${rowA.original.first_name} ${rowA.original.middle_name}`.toLowerCase();
        const bName =
          `${rowB.original.last_name}, ${rowB.original.first_name} ${rowB.original.middle_name}`.toLowerCase();
        return aName.localeCompare(bName);
      },
    },
    {
      accessorKey: "school_id",
      header: "School ID",
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => row.original.gender || "N/A",
    },
    {
      accessorKey: "year_level",
      header: "Year",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/student/${row.original.school_id}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-700"
            onClick={() => handleDelete(row.original.school_id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const handleDelete = async (schoolId: string) => {
    console.log("Delete clicked for:", schoolId);
  };

  const handleMoveToUnselected = (indices: number[]) => {
    const accountsToMove = indices.map((index) => selectedAccounts[index]);
    setSelectedAccounts((prev) =>
      prev.filter((_, index) => !indices.includes(index))
    );
    setUnselectedAccounts((prev) => [...prev, ...accountsToMove]);
  };

  const handleMoveToSelected = (indices: number[]) => {
    const accountsToMove = indices.map((index) => unselectedAccounts[index]);
    setUnselectedAccounts((prev) =>
      prev.filter((_, index) => !indices.includes(index))
    );
    setSelectedAccounts((prev) => [...prev, ...accountsToMove]);
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(
          `/api/accounts-by-course/${courseShortName}`
        );
        if (!response.ok) throw new Error("Failed to fetch accounts");
        const data: AccountsData = await response.json();
        setAccountsData(data);
        setSelectedAccounts(data.accounts);
        setUnselectedAccounts([]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, [courseShortName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!accountsData || accountsData.account_count === 0)
    return <div>No accounts found for this course.</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        {accountsData.course} - Total: {accountsData.account_count}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DataTable
          data={selectedAccounts}
          columns={columns}
          title="Selected Accounts"
          onMoveRows={handleMoveToUnselected}
        />

        <DataTable
          data={unselectedAccounts}
          columns={columns}
          title="Unselected Accounts"
          onMoveRows={handleMoveToSelected}
        />
      </div>
    </div>
  );
};

export default AccountsByCourse;
