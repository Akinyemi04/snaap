"use client";

import { ReactNode, useState } from "react";

interface DragState {
  isDragging: boolean;
  isOver: boolean;
}

interface SortableListProps<T> {
  items: T[];
  onChange: (nextItems: T[]) => void;
  getId: (item: T) => string;
  className?: string;
  itemClassName?: string;
  renderItem: (item: T, index: number, state: DragState) => ReactNode;
}

const reorder = <T,>(items: T[], fromIndex: number, toIndex: number): T[] => {
  const nextItems = [...items];
  const [movedItem] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, movedItem);
  return nextItems;
};

export default function SortableList<T>({
  items,
  onChange,
  getId,
  className,
  itemClassName,
  renderItem,
}: SortableListProps<T>) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const resetDragState = () => {
    setDraggingId(null);
    setOverId(null);
  };

  return (
    <div className={className}>
      {items.map((item, index) => {
        const itemId = getId(item);
        const isDragging = draggingId === itemId;
        const isOver = overId === itemId && draggingId !== itemId;

        return (
          <div
            key={itemId}
            draggable
            onDragStart={(event) => {
              event.dataTransfer.effectAllowed = "move";
              setDraggingId(itemId);
              setOverId(itemId);
            }}
            onDragOver={(event) => {
              event.preventDefault();
              event.dataTransfer.dropEffect = "move";

              if (overId !== itemId) {
                setOverId(itemId);
              }
            }}
            onDrop={(event) => {
              event.preventDefault();

              if (!draggingId || draggingId === itemId) {
                resetDragState();
                return;
              }

              const fromIndex = items.findIndex(
                (entry) => getId(entry) === draggingId,
              );
              const toIndex = items.findIndex((entry) => getId(entry) === itemId);

              if (fromIndex === -1 || toIndex === -1) {
                resetDragState();
                return;
              }

              onChange(reorder(items, fromIndex, toIndex));
              resetDragState();
            }}
            onDragEnd={resetDragState}
            className={[
              itemClassName ?? "",
              "transition-all duration-150",
              isDragging ? "opacity-60" : "",
              isOver ? "ring-2 ring-[#4c6fff]/50 rounded-2xl" : "",
            ]
              .join(" ")
              .trim()}
          >
            {renderItem(item, index, { isDragging, isOver })}
          </div>
        );
      })}
    </div>
  );
}
