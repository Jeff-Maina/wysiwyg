"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Strike from "@tiptap/extension-strike";
import Link from "@tiptap/extension-link";

import {
  AtSign,
  Bold as BoldIcon,
  CaseSensitive,
  Code,
  Italic,
  Link as LinkIcon,
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
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LinkModal from "./link-modal";

const EditorComp = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.extend({ inclusive: false }).configure({
        protocols: ["https", "http"],
        autolink: true,
        openOnClick: false,
        HTMLAttributes: {
          class: "input-link",
        },
      }),
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-24 outline-none text-neutral-600",
      },
    },
  });

  useEffect(() => {}, []);

  const [formatMenuVisible, setFormatMenuVisible] = useState(true);

  // Link modal logic
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const [linkText, setLinkText] = useState<string>("");
  const [linkUrl, setLinkUrl] = useState<string>("");

  // Function to trigger modal and set initial link text
  const openLinkModal = () => {
    if (!editor) return;

    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, " ");

    // If text is selected, use it for the link
    if (selectedText) {
      setHighlighted(true);
      setLinkText(selectedText);
    } else {
      setHighlighted(false);
      setLinkText("");
    }

    setIsLinkModalOpen(true);
  };

  const setLink = useCallback(() => {
    if (!editor) return;

    // cancelled
    if (linkUrl === null) {
      return;
    }

    // empty
    if (linkUrl === " ") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setIsLinkModalOpen(false);
      setLinkText("");
      setLinkUrl("");
      return;
    }

    if (highlighted === false) {
      editor
        .chain()
        .setLink({ href: linkUrl })
        .insertContent(linkText)
        .unsetMark("link")
        .focus()
        .run();

      setIsLinkModalOpen(false);
      setLinkText("");
      setLinkUrl("");

      return;
    }

    // update link
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: linkUrl })
      .run();

    setIsLinkModalOpen(false);
    setLinkText("");
    setLinkUrl("");
    setHighlighted(false);
  }, [editor, linkText, linkUrl]);

  return (
    <>
      <div>
        <div className=" w-[35rem] min-h-20 border overflow-hidden rounded-lg">
          {formatMenuVisible ? (
            <div className="flex items-center divide-x p-1.5 bg-neutral-100">
              <div className="flex items-center gap-1.5">
                <TooltipWrapper sideOffset={10} label="Bold" align="center">
                  <button
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={cn(
                      "custom_button",
                      editor?.isActive("bold") ? "is-active" : ""
                    )}
                  >
                    <BoldIcon size={16} />
                  </button>
                </TooltipWrapper>

                <TooltipWrapper sideOffset={10} label="Italic" align="center">
                  <button
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className={cn(
                      "custom_button",
                      editor?.isActive("italic") ? "is-active" : ""
                    )}
                  >
                    <Italic size={16} />
                  </button>
                </TooltipWrapper>
                <TooltipWrapper
                  sideOffset={10}
                  label="Strikethrough"
                  align="center"
                >
                  <button
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                    className={cn(
                      "custom_button",
                      editor?.isActive("strike") ? "is-active" : ""
                    )}
                  >
                    <Strikethrough size={16} />
                  </button>
                </TooltipWrapper>
              </div>
              <div className="flex items-center">
                <TooltipWrapper sideOffset={10} label="Link" align="center">
                  <button
                    onClick={openLinkModal}
                    className="px-3 text-neutral-400 hover:text-black transition-all"
                  >
                    <LinkIcon size={16} />
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
                <TooltipWrapper
                  sideOffset={10}
                  label="Blockquote"
                  align="center"
                >
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
                <TooltipWrapper
                  sideOffset={10}
                  label="Code Block"
                  align="center"
                >
                  <button className="px-3 text-neutral-400 hover:text-black transition-all">
                    <SquareTerminal size={16} />
                  </button>
                </TooltipWrapper>
              </div>
            </div>
          ) : null}

          <div className="element p-3">
            <EditorContent
              autoCorrect="false"
              placeholder="Type something..."
              className="!min-h-24"
              editor={editor}
            />
          </div>

          {/* lower taskbar */}

          <div className="flex p-2 justify-between divide-x items-center">
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
                  <button
                    onClick={() => setFormatMenuVisible(!formatMenuVisible)}
                    className="px-2 text-neutral-500 hover:text-black transition-all"
                  >
                    <CaseSensitive size={20} />
                  </button>
                </TooltipWrapper>
                <TooltipWrapper sideOffset={10} label={"Emoji"} align="center">
                  <button className="px-2  text-neutral-500 hover:text-black transition-all">
                    <Smile
                      size={18}
                      className="hover:fill-yellow-400 hover:rotate-12 transition-all"
                    />
                  </button>
                </TooltipWrapper>
                <TooltipWrapper sideOffset={10} label={"Emoji"} align="center">
                  <button className="px-2  text-neutral-500 hover:text-black transition-all">
                    <AtSign size={18} />
                  </button>
                </TooltipWrapper>
              </div>
              <div className="flex items-center px-2">
                <TooltipWrapper
                  sideOffset={10}
                  label={"Record video clip"}
                  align="center"
                >
                  <button className="px-2  text-neutral-500 hover:text-black transition-all">
                    <Video size={18} />
                  </button>
                </TooltipWrapper>
                <TooltipWrapper
                  sideOffset={10}
                  label={"Record audio clip"}
                  align="center"
                >
                  <button className="px-2  text-neutral-500 hover:text-black transition-all">
                    <Mic size={18} />
                  </button>
                </TooltipWrapper>
              </div>
              <div className="flex items-center px-2">
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
              <TooltipWrapper label="Send now" align="center" alignOffset={10}>
                <button className="bg-green-600 px-2 py-1 rounded">
                  <SendHorizonal
                    size={20}
                    fill="white"
                    className="stroke-white"
                  />
                </button>
              </TooltipWrapper>
            </div>
          </div>
        </div>
      </div>

      {/* link modal */}
      <LinkModal
        linkText={linkText}
        linkUrl={linkUrl}
        setLinkText={setLinkText}
        setLinkUrl={setLinkUrl}
        isModalOpen={isLinkModalOpen}
        onSubmit={setLink}
        toggleLinkModal={() => setIsLinkModalOpen(!isLinkModalOpen)}
      />
    </>
  );
};

export default EditorComp;
