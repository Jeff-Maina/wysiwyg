import { cn } from "@/lib/utils";
import parse from "html-react-parser";

type TMessagesProps = {
  messages: {
    message: string;
    time: string;
  }[];
};

const Messages = ({ messages }: TMessagesProps) => {
  return (
    <div className="w-full flex messages flex-col gap-1 h-full justify-end py-10">
      {messages.map((message, index) => {
        const component = parse(message.message);
        return (
          <div
            className={cn(
              "flex items-start gap-2 w-full hover:bg-neutral-100",
              index !== 0 ? "" : ""
            )}
          >
            <div
              className={cn(
                " shrink-0 rounded-lg  from-purple-800 to-purple-400 overflow-hidden",
                index !== 0
                  ? "bg-transparent w-8 h-6"
                  : "bg-gradient-to-tr size-8"
              )}
            >

            </div>
            <div className="flex flex-col gap-1.5 w-full">
              {index === 0 && (
                <div className="flex items-end gap-1.5">
                  <p className="font-semibold">john</p>
                  <small className="text-neutral-500">{message.time}</small>
                </div>
              )}

              <div className="w-full">{component}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
