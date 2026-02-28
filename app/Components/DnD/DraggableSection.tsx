"use client";

import { Dispatch, SetStateAction } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

import { Widget } from "../Types/widget";
import StatCard from "../Widgets/StatCard";

interface Props {
  items: Widget[];
  setItems: Dispatch<SetStateAction<Widget[]>>;
}

const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export default function DraggableSection({ items, setItems }: Props) {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = reorder(
      items,
      result.source.index,
      result.destination.index,
    );

    setItems(reordered);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="cloud-network" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              lg:grid-cols-4 
              gap-6
            "
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <StatCard
                      title={item.title}
                      value={item.value}
                      change={item.change}
                      tone={item.tone}
                      trend={item.trend}
                      subtitle={item.subtitle}
                    />
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
