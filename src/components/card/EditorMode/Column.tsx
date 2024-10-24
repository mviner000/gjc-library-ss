import React, { useState } from "react";
import { CellData, BookTransaction, BookRecord } from "@/types";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CardCalendar } from "@/components/ui/library-card-calendar-picker";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useBookTransactionsContext } from "@/app/student/_hooks/useBookTransactions";

interface ColumnProps {
  isLastColumn: boolean;
  startNumber: number;
  onDataChange: (index: number, value: string) => void;
  onLineThroughToggle: (index: number) => void;
  gridData: { [key: number]: CellData };
  studentId: string;
  mode: string;
  onInsertClick: (index: number) => void;
  getCellClassName: (cellIndex: number) => string;
  className?: string;
  onDateSelect: (cellIndex: number, date: Date) => void;
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const findTransactionAndRecordByPlacingNumber = (
  bookTransactions: BookTransaction[] | null,
  placingNumber: number
): { transaction: BookTransaction | null; record: BookRecord | null } => {
  if (!bookTransactions) return { transaction: null, record: null };

  for (const transaction of bookTransactions) {
    const record = transaction.records.find(
      (r) => r.placing_number === placingNumber
    );
    if (record) {
      return { transaction, record };
    }
  }
  return { transaction: null, record: null };
};

const Column: React.FC<ColumnProps> = ({
  isLastColumn,
  startNumber,
  onDataChange,
  onLineThroughToggle,
  gridData,
  studentId,
  mode,
  onInsertClick,
  getCellClassName,
  className,
  onDateSelect,
}) => {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [editingCell, setEditingCell] = useState<number | null>(null);
  const { toast } = useToast();
  const { bookTransactions } = useBookTransactionsContext();

  const handleDragStart = (e: React.DragEvent, cellIndex: number) => {
    if (editingCell === cellIndex) return;
    const cellData = gridData[cellIndex];
    if (cellData && cellData.value) {
      const { transaction, record } = findTransactionAndRecordByPlacingNumber(
        bookTransactions,
        cellIndex
      );

      const dragData = JSON.stringify({
        index: cellIndex,
        value: cellData.value,
        transaction: transaction,
        record: record,
      });
      e.dataTransfer.setData("application/json", dragData);
      e.dataTransfer.effectAllowed = "copy";
      e.currentTarget.classList.add("opacity-50");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    e.currentTarget.classList.add("bg-green-100");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("bg-green-100");
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("opacity-50");
  };

  const handleDrop = (e: React.DragEvent, targetCellIndex: number) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-green-100");

    try {
      const dragData = JSON.parse(e.dataTransfer.getData("application/json"));
      const { index: sourceIndex, value, transaction, record } = dragData;

      if (sourceIndex !== targetCellIndex) {
        onDataChange(targetCellIndex, value);

        toast({
          title: "Content Copied Successfully",
          description: (
            <div className="mt-2 space-y-2">
              <p>
                <strong>From Cell:</strong> {sourceIndex} →{" "}
                <strong>To Cell:</strong> {targetCellIndex}
              </p>
              <p>
                <strong>Status:</strong> {record?.record_type}
              </p>
              <p>
                <strong>Call Number:</strong> {transaction?.callno}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {record?.datetime
                  ? new Date(record.datetime).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <strong>Record ID:</strong> {record?.id || "N/A"}
              </p>
              <p>
                <strong>Accession:</strong>{" "}
                {transaction?.accession_number || "N/A"}
              </p>
              <p>
                <strong>Book Title:</strong> {transaction?.book_title || "N/A"}
              </p>
              <div className="mt-2 p-2 bg-slate-100 rounded">
                <p className="text-sm text-slate-600">Full Content: {value}</p>
              </div>
            </div>
          ),
          duration: 5000,
          action: (
            <ToastAction altText="Close" onClick={() => {}}>
              Dismiss
            </ToastAction>
          ),
        });
      }
    } catch (error) {
      console.error("Drop error:", error);
      toast({
        title: "Copy Failed",
        description: "Failed to copy content between cells. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleClearClick = () => {
    toast({
      title: "Cleared feature is in BETA MODE",
      description: "Waiting for confirmation for this feature.",
      action: <ToastAction altText="Goto schedule to undo">Close</ToastAction>,
    });
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setCalendarOpen(true);
    }
  };

  const handleClose = () => {
    setCalendarOpen(false);
  };

  const handleDateSelect = (cellIndex: number) => (date: Date | undefined) => {
    if (date) {
      onDateSelect(cellIndex, date);
      setCalendarOpen(false);
    }
  };

  const handleCellClick = (cellIndex: number) => {
    setEditingCell(cellIndex);
  };

  const handleBlur = () => {
    setEditingCell(null);
  };

  return (
    <div
      className={cn(
        "flex flex-col",
        isLastColumn ? "" : "border-r border-black",
        className
      )}
    >
      {[...Array(9)].map((_, rowIndex) => {
        const cellIndex = Math.max(1, startNumber + rowIndex);
        const cellData = gridData[cellIndex] || {
          value: "",
          isLineThrough: false,
        };
        const isDraggable =
          cellData.value.trim() !== "" && editingCell !== cellIndex;
        const isEditing = editingCell === cellIndex;

        const displayText = truncateText(cellData.value, 9);

        return (
          <div
            key={rowIndex}
            className={cn(
              "font-bold font-sans relative flex items-center justify-center border-b border-black last:border-b-1 text-center min-h-[40px]",
              getCellClassName(cellIndex),
              isDraggable ? "cursor-move" : "cursor-text",
              "transition-colors duration-200"
            )}
            onMouseEnter={() => setHoveredCell(cellIndex)}
            onMouseLeave={() => setHoveredCell(null)}
            draggable={isDraggable}
            onDragStart={(e) => handleDragStart(e, cellIndex)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, cellIndex)}
            onDoubleClick={() => onLineThroughToggle(cellIndex)}
            onClick={() => handleCellClick(cellIndex)}
          >
            {hoveredCell === cellIndex && !isDraggable && (
              <button
                className="absolute left-0 top-0 p-1 hover:opacity-80"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearClick();
                }}
              >
                ✅
              </button>
            )}

            {isEditing ? (
              <textarea
                className="w-full h-[39px] bg-transparent text-center resize-none outline-none focus:outline-dashed focus:outline-green-500 pb-1 overflow-y-auto"
                value={cellData.value}
                onChange={(e) => onDataChange(cellIndex, e.target.value)}
                onBlur={handleBlur}
                autoFocus
              />
            ) : (
              <div
                className={cn(
                  "w-full pt-[15px] select-none",
                  cellData.isLineThrough && "line-through",
                  isDraggable &&
                    "rounded px-2 shadow-sm hover:shadow-md transition-shadow duration-200"
                )}
                title={cellData.value}
              >
                {displayText}
              </div>
            )}

            {hoveredCell === cellIndex && !isDraggable && mode === "editor" && (
              <Popover open={calendarOpen} onOpenChange={handleOpenChange}>
                <PopoverTrigger asChild>
                  <button
                    className="absolute right-0 top-0 p-1 hover:opacity-80"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCalendarOpen(true);
                    }}
                  >
                    📅
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <CardCalendar
                    selected={undefined}
                    onSelect={handleDateSelect(cellIndex)}
                    initialFocus
                    isOpen={calendarOpen}
                    onClose={handleClose}
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Column;
