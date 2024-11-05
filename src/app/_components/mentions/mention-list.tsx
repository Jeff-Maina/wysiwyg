import { cn } from "@/lib/utils";
import { UserRound } from "lucide-react";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

interface MentionListProps {
  items: string[];
  command: (args: { id: string }) => void;
}

interface MentionListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

const MentionList = forwardRef<MentionListRef, MentionListProps>(
  (props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
      const item = props.items[index];

      if (item) {
        props.command({ id: item });
      }
    };

    const upHandler = () => {
      setSelectedIndex(
        (selectedIndex + props.items.length - 1) % props.items.length
      );
    };

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % props.items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [props.items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: KeyboardEvent }) => {
        if (event.key === "ArrowUp") {
          upHandler();
          return true;
        }

        if (event.key === "ArrowDown") {
          downHandler();
          return true;
        }

        if (event.key === "Enter") {
          enterHandler();
          return true;
        }

        return false;
      },
    }));

    return (
      <div className="dropdown-menu w-56 border rounded shadow-md bg-white p-2 pr-1">
        <div className="w-full max-h-40 pr-1 overflow-y-auto custom_scrollbar flex flex-col items-start">
          {props.items.length ? (
            props.items.map((item, index) => (
              <button
                className={cn(
                  "w-full flex items-center gap-2 text-start p-1 text-sm px-2 rounded-sm text-neutral-500 font-medium hover:text-neutral-700 hover:bg-neutral-100",
                  index === selectedIndex
                    ? "bg-neutral-200 text-neutral-800"
                    : ""
                )}
                key={index}
                onClick={() => selectItem(index)}
              >
                {item}
              </button>
            ))
          ) : (
            <div className="item">No result</div>
          )}
        </div>
      </div>
    );
  }
);

// Export the component
export default MentionList;
