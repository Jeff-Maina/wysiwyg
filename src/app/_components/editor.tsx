"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import {
  AtSign,
  Bold,
  CaseSensitive,
  Code,
  Italic,
  Link,
  List,
  ListOrderedIcon,
  Mic,
  Plus,
  SendHorizonal,
  Smile,
  SquareSlash,
  SquareTerminal,
  Strikethrough,
  TextQuote,
  Video,
} from "lucide-react";
import TooltipWrapper from "./tooltip_wrapper";
import { useState } from "react";

const EditorComp = () => {
  const editor = useEditor({
    extensions: [StarterKit, Document, Paragraph, Text],
    content: "",
  });

  const [formatMenuVisible, setFormatMenuVisible] = useState(true);

  return (
    <div>
      <div className=" w-[35rem] min-h-20 border p-3 rounded-lg">
        {formatMenuVisible ? (
          <div className="flex items-center divide-x pb-2">
            <div className="flex items-center">
              <TooltipWrapper sideOffset={10} label="Bold" align="center">
                <button className="pr-3 text-neutral-400 hover:text-black transition-all">
                  <Bold size={16} />
                </button>
              </TooltipWrapper>
              <TooltipWrapper sideOffset={10} label="Italic" align="center">
                <button className="px-3 text-neutral-400 hover:text-black transition-all">
                  <Italic size={16} />
                </button>
              </TooltipWrapper>
              <TooltipWrapper
                sideOffset={10}
                label="Strikethrough"
                align="center"
              >
                <button className="px-3 text-neutral-400 hover:text-black transition-all">
                  <Strikethrough size={16} />
                </button>
              </TooltipWrapper>
            </div>
            <div className="flex items-center">
              <TooltipWrapper sideOffset={10} label="Link" align="center">
                <button className="px-3 text-neutral-400 hover:text-black transition-all">
                  <Link size={16} />
                </button>
              </TooltipWrapper>
            </div>
            <div className="flex items-center">
              <TooltipWrapper
                sideOffset={10}
                label="Ordered list"
                align="center"
              >
                <button className="px-3 text-neutral-400 hover:text-black transition-all">
                  <ListOrderedIcon size={16} />
                </button>
              </TooltipWrapper>
              <TooltipWrapper
                sideOffset={10}
                label="Bulleted list"
                align="center"
              >
                <button className="px-3 text-neutral-400 hover:text-black transition-all">
                  <List size={16} />
                </button>
              </TooltipWrapper>
            </div>
            <div className="flex items-center">
              <TooltipWrapper sideOffset={10} label="Blockquote" align="center">
                <button className="px-3 text-neutral-400 hover:text-black transition-all">
                  <TextQuote size={16} />
                </button>
              </TooltipWrapper>
            </div>
            <div className="flex items-center">
              <TooltipWrapper sideOffset={10} label="Code" align="center">
                <button className="px-3 text-neutral-400 hover:text-black transition-all">
                  <Code size={16} />
                </button>
              </TooltipWrapper>
              <TooltipWrapper sideOffset={10} label="Code Block" align="center">
                <button className="px-3 text-neutral-400 hover:text-black transition-all">
                  <SquareTerminal size={16} />
                </button>
              </TooltipWrapper>
            </div>
          </div>
        ) : null}
        <div className="element">
          <EditorContent className="min-h-24" editor={editor} />
        </div>
        <div className="flex pt-2 justify-between divide-x items-center">
          <div className="flex divide-x items-center">
            <div className="flex items-center pr-1.5">
              <TooltipWrapper sideOffset={5} align="center" label="Attach">
                <button className="size-7 mr-1.5 grid place-items-center rounded-full bg-neutral-200/70 hover:bg-neutral-200 text-neutral-600 hover:text-black">
                  <Plus size={16} />
                </button>
              </TooltipWrapper>
              <TooltipWrapper
                sideOffset={10}
                label={
                  formatMenuVisible ? "Show formatting" : "Hide formatting"
                }
                align="center"
              >
                <button className="px-1.5 text-neutral-500 hover:text-black transition-all">
                  <CaseSensitive size={20} />
                </button>
              </TooltipWrapper>
              <TooltipWrapper sideOffset={10} label={"Emoji"} align="center">
                <button className="px-1.5  text-neutral-500 hover:text-black transition-all">
                  <Smile
                    size={18}
                    className="hover:fill-yellow-400 hover:rotate-12 transition-all"
                  />
                </button>
              </TooltipWrapper>
              <TooltipWrapper sideOffset={10} label={"Emoji"} align="center">
                <button className="px-1.5  text-neutral-500 hover:text-black transition-all">
                  <AtSign size={18} />
                </button>
              </TooltipWrapper>
            </div>
            <div className="flex items-center px-1.5">
              <TooltipWrapper
                sideOffset={10}
                label={"Record video clip"}
                align="center"
              >
                <button className="px-1.5  text-neutral-500 hover:text-black transition-all">
                  <Video size={18} />
                </button>
              </TooltipWrapper>
              <TooltipWrapper
                sideOffset={10}
                label={"Record audio clip"}
                align="center"
              >
                <button className="px-1.5  text-neutral-500 hover:text-black transition-all">
                  <Mic size={18} />
                </button>
              </TooltipWrapper>
            </div>
            <div className="flex items-center px-1.5">
              <TooltipWrapper
                sideOffset={10}
                label={"Run shortcut"}
                align="center"
              >
                <button className="px-1.5  text-neutral-500 hover:text-black transition-all">
                  <SquareSlash size={18} />
                </button>
              </TooltipWrapper>
            </div>
          </div>
          <div>
            <button className="bg-green-600 px-2 py-1 rounded">
              <SendHorizonal size={20} fill="white" className="stroke-white"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorComp;
