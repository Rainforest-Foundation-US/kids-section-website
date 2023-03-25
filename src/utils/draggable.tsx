import { useCallback, useRef, useState } from "react";

interface DraggableMeta<T> {
  targetAreaId: string;
  value: T;
}

function serialize<T>(value: DraggableMeta<T>) {
  return JSON.stringify(value);
}

function deserialize<T>(value: string) {
  const object = JSON.parse(value);

  if (typeof object !== "object") {
    throw new Error("Deserialized value is not an object.");
  }

  if (!("targetAreaId" in object)) {
    throw new Error("Deserialized value is not a DraggableMeta.");
  }

  return object as DraggableMeta<T>;
}

export function useDraggable<T>(
  targetAreaId: string,
  value: T,
  onKeyboardDrop: (value: T) => void
) {
  const draggableRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.dataTransfer.setData(
        "text/plain",
        "" +
          serialize({
            targetAreaId,
            value,
          })
      );
      event.dataTransfer.effectAllowed = "copy";

      setIsDragging(true);
    },
    [targetAreaId, value]
  );

  const handleDragEnd = useCallback(() => {
    if (draggableRef.current) {
      setIsDragging(false);
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        onKeyboardDrop(value);
      }
    },
    [onKeyboardDrop, value]
  );

  const props = {
    ref: draggableRef,
    draggable: true,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onKeyDown: handleKeyDown,
  };

  return [props, isDragging] as const;
}

export function useDroppable<T>(areaId: string, onDrop: (value: T) => void) {
  const droppableRef = useRef<HTMLDivElement>(null);

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      const meta = event.dataTransfer.getData("text/plain");
      const metaObj = deserialize<T>(meta);

      if (event.currentTarget.id !== areaId) {
        return;
      }

      onDrop(metaObj.value);
    },
    [areaId, onDrop]
  );

  const props = {
    ref: droppableRef,
    id: areaId,
    onDragOver: handleDragOver,
    onDrop: handleDrop,
  };

  return [props] as const;
}
