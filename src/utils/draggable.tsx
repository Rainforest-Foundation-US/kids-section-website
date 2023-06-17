import { useCallback, useRef, useState } from "react";

interface DraggableMeta<T> {
  targetAreaId: string;
  value: T;
}

function serialize<T>(value: DraggableMeta<T>) {
  return JSON.stringify(value);
}

function deserialize<T>(value: string) {
  try {
    const object = JSON.parse(value);

    if (typeof object !== "object") {
      throw new Error("Deserialized value is not an object.");
    }

    if (!("targetAreaId" in object)) {
      throw new Error("Deserialized value is not a DraggableMeta.");
    }

    return object as DraggableMeta<T>;
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new Error("Deserialized value is not a DraggableMeta.");
    }

    throw err;
  }
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

export function useDroppable<V, T extends HTMLElement = HTMLDivElement>(
  areaId: string,
  onDrop: (value: V, target: T) => void
) {
  const droppableRef = useRef<T>(null);

  const handleDragOver = useCallback((event: React.DragEvent<T>) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent<T>) => {
      const meta = event.dataTransfer.getData("text/plain");

      try {
        const metaObj = deserialize<V>(meta);

        if (event.currentTarget.id !== areaId) {
          return;
        }

        onDrop(metaObj.value, event.currentTarget);
      } catch (err) {
        if (
          err instanceof Error &&
          err.message === "Deserialized value is not a DraggableMeta."
        ) {
          return;
        }

        throw err;
      }
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
