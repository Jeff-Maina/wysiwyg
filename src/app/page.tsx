"use client";
import { useState } from "react";
import EditorComp from "./_components/editor";

import Messages from "./_components/messages";
import Link from "next/link";

export default function Home() {
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  const [messages, setMessages] = useState<{ message: string; time: string }[]>(
    []
  );

  const currentTime = () => {
    const date = new Date();
    const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes}${ampm}`;
  };
  const addNewMessage = (message: string) => {
    const messageObj = {
      message,
      time: currentTime(),
    };
    setMessages([...messages, messageObj]);
  };

  return (
    <div className="p-4">
      {/* navbar */}
      <div className="relative">
        <div className="max-w-5xl flex justify-end m-auto w-full">
          <Link href={"/about"} className="text-sm underline text-neutral-500 hover:text-black">About project</Link>
        </div>
        {isAboutVisible ? (
          <div
            onClick={() => setIsAboutVisible(false)}
            className="w-[100vw] h-[100vh] fixed inset-0"
          ></div>
        ) : null}
      </div>

      {/* actual input */}
      <div className="w-full rounded-md max-w-5xl h-[90vh] mt-4 m-auto flex flex-col items-center justify-between p-4 border">
        <Messages messages={messages} />
        <EditorComp addNewMessage={addNewMessage} />
      </div>
    </div>
  );
}
