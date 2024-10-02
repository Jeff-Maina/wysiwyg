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
    <div className="w-full flex messages flex-col h-full justify-end py-10">
      {messages.map((message, index) => {
        const component = parse(message.message);
        const smallTIme = message.time.slice(0, 5);
        return (
          <div
            className={cn(
              "flex items-start gap-2 w-full group/card hover:bg-neutral-100/70  py-1 px-4",
              index !== 0 ? "" : ""
            )}
          >
            {index === 0 ? (
              <div
                className={cn(
                  " shrink-0 rounded-lg   overflow-hidden grid place-items-center",
                  index !== 0
                    ? "bg-transparent w-10 h-6"
                    : "bg-blue-500 size-10"
                )}
              >
                <p className="text-white text-xl font-semibold">J</p>
              </div>
            ) : (
              <div className="w-10 h-6 text-[10px] opacity-0 group-hover/card:opacity-100  text-neutral-500 flex items-center justify-end">
                {smallTIme}
              </div>
            )}
            <div className="flex flex-col gap-1.5 w-full">
              {index === 0 && (
                <div className="flex items-end gap-1.5">
                  <p className="font-semibold">john</p>
                  <small className="text-neutral-500">{message.time}</small>
                </div>
              )}

              <div className="w-full text-sm">{component}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
