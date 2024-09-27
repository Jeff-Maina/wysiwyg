"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Strike from "@tiptap/extension-strike";
import Link from "@tiptap/extension-link";
import suggestion from "@tiptap/suggestion";
import Code from "@tiptap/extension-code";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";

import {
  AtSign,
  Bold as BoldIcon,
  CaseSensitive,
  Code as CodeIcon,
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
import CodeBlock from "@tiptap/extension-code-block";

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
      Placeholder.configure({
        placeholder: "Type a message",
      }),
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: " outline-none text-neutral-800 text-sm",
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
              <div className="flex items-center gap-1.5 px-1.5">
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
              <div className="flex items-center px-1.5 gap-1.5">
                <TooltipWrapper sideOffset={10} label="Link" align="center">
                  <button
                    onClick={openLinkModal}
                    className={cn("custom_button")}
                  >
                    <LinkIcon size={16} />
                  </button>
                </TooltipWrapper>
              </div>
              <div className="flex items-center px-1.5 gap-1.5">
                <TooltipWrapper
                  sideOffset={10}
                  label="Ordered list"
                  align="center"
                >
                  <button
                    onClick={() =>
                      editor?.chain().focus().toggleOrderedList().run()
                    }
                    className={cn(
                      "custom_button",
                      editor?.isActive("orderedList") ? "is-active" : ""
                    )}
                  >
                    <ListOrderedIcon size={16} />
                  </button>
                </TooltipWrapper>
                <TooltipWrapper
                  sideOffset={10}
                  label="Bulleted list"
                  align="center"
                >
                  <button
                    onClick={() =>
                      editor?.chain().focus().toggleBulletList().run()
                    }
                    className={cn(
                      "custom_button",
                      editor?.isActive("bulletList") ? "is-active" : ""
                    )}
                  >
                    <List size={16} />
                  </button>
                </TooltipWrapper>
              </div>
              <div className="flex items-center px-1.5 gap-1.5">
                <TooltipWrapper
                  sideOffset={10}
                  label="Blockquote"
                  align="center"
                >
                  <button
                    onClick={() =>
                      editor?.chain().focus().toggleBlockquote().run()
                    }
                    className={cn(
                      "custom_button",
                      editor?.isActive("blockquote") ? "is-active" : ""
                    )}
                  >
                    <TextQuote size={16} />
                  </button>
                </TooltipWrapper>
              </div>
              <div className="flex items-center px-1.5 gap-1.5">
                <TooltipWrapper sideOffset={10} label="Code" align="center">
                  <button
                    onClick={() => editor?.chain().focus().toggleCode().run()}
                    className={cn(
                      "custom_button disabled:text-neutral-300 disabled:cursor-not-allowed",
                      editor?.isActive("code") ? "is-active" : ""
                    )}
                    disabled={editor?.isActive("codeBlock")}
                  >
                    <CodeIcon size={16} />
                  </button>
                </TooltipWrapper>
                <TooltipWrapper
                  sideOffset={10}
                  label="Code Block"
                  align="center"
                >
                  <button
                    onClick={() =>
                      editor?.chain().focus().toggleCodeBlock().run()
                    }
                    className={cn(
                      "custom_button",
                      editor?.isActive("codeBlock") ? "is-active" : ""
                    )}
                  >
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
              className=""
              editor={editor}
            />
          </div>

          {/* lower taskbar */}

          <div className="flex p-2 justify-between divide-x items-center">
            <div className="flex divide-x items-center">
              <div className="flex items-center pr-1.5">
                <TooltipWrapper sideOffset={5} align="center" label="Attach">
                  <button
                    disabled={true}
                    className="size-7 mr-1.5 grid place-items-center rounded-full bg-neutral-200/70 hover:bg-neutral-200 text-neutral-600 hover:text-black disabled:cursor-not-allowed"
                  >
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
                  <button
                    disabled={true}
                    className="px-2  disabled:cursor-not-allowed disabled:text-neutral-300  text-neutral-500 hover:text-black transition-all"
                  >
                    <Video size={18} />
                  </button>
                </TooltipWrapper>
                <TooltipWrapper
                  sideOffset={10}
                  label={"Record audio clip"}
                  align="center"
                >
                  <button
                    disabled={true}
                    className="px-2  disabled:cursor-not-allowed disabled:text-neutral-300  text-neutral-500 hover:text-black transition-all"
                  >
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
                  <button
                    disabled={true}
                    className="px-2  disabled:cursor-not-allowed disabled:text-neutral-300  text-neutral-500 hover:text-black transition-all"
                  >
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

          {/* bubble menu */}
          {editor && (
            <BubbleMenu
            
              className={cn(
                "-translate-y-2",
                formatMenuVisible ||
                  (isLinkModalOpen &&
                    "hidden pointer-events-none absolute -z-[999]")
              )}
              editor={editor}
              tippyOptions={{ duration: 100 }}
            >
              <div className="bubble-menu bg-neutral-900 divide-x py-1.5 divide-neutral-600 flex items-center rounded-md ">
                <div className="flex gap-1.5 px-1.5">
                  <TooltipWrapper sideOffset={10} label="Bold" align="center">
                    <button
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                      className={cn(
                        "bubble_button text-neutral-100",
                        editor?.isActive("bold") ? "is-bb-active" : ""
                      )}
                    >
                      <BoldIcon size={16} />
                    </button>
                  </TooltipWrapper>
                  <TooltipWrapper sideOffset={10} label="Italic" align="center">
                    <button
                      onClick={() =>
                        editor?.chain().focus().toggleItalic().run()
                      }
                      className={cn(
                        "bubble_button text-neutral-100",
                        editor?.isActive("italic") ? "is-bb-active" : ""
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
                      onClick={() =>
                        editor?.chain().focus().toggleStrike().run()
                      }
                      className={cn(
                        "bubble_button text-neutral-100",
                        editor?.isActive("strike") ? "is-bb-active" : ""
                      )}
                    >
                      <Strikethrough size={16} />
                    </button>
                  </TooltipWrapper>
                </div>
                <div className="flex gap-1.5 px-1.5">
                  <TooltipWrapper sideOffset={10} label="Bold" align="center">
                    <button
                      onClick={openLinkModal}
                      className={cn(
                        "bubble_button text-neutral-100",
                        editor?.isActive("link") ? "is-bb-active" : ""
                      )}
                    >
                      <LinkIcon size={16} />
                    </button>
                  </TooltipWrapper>
                </div>
                <div className="flex gap-1.5 px-1.5">
                  <TooltipWrapper
                    sideOffset={10}
                    label="Ordered List"
                    align="center"
                  >
                    <button
                      onClick={() =>
                        editor?.chain().focus().toggleOrderedList().run()
                      }
                      className={cn(
                        "bubble_button text-neutral-100",
                        editor?.isActive("orderedList") ? "is-bb-active" : ""
                      )}
                    >
                      <ListOrderedIcon size={16} />
                    </button>
                  </TooltipWrapper>
                  <TooltipWrapper sideOffset={10} label="List" align="center">
                    <button
                      onClick={() =>
                        editor?.chain().focus().toggleBulletList().run()
                      }
                      className={cn(
                        "bubble_button text-neutral-100",
                        editor?.isActive("bulletList") ? "is-bb-active" : ""
                      )}
                    >
                      <List size={16} />
                    </button>
                  </TooltipWrapper>
                </div>
                <div className="flex gap-1.5 px-1.5">
                  <TooltipWrapper
                    sideOffset={10}
                    label="Blockquote"
                    align="center"
                  >
                    <button
                      onClick={() =>
                        editor?.chain().focus().toggleBlockquote().run()
                      }
                      className={cn(
                        "bubble_button text-neutral-100",
                        editor?.isActive("blockquote") ? "is-bb-active" : ""
                      )}
                    >
                      <TextQuote size={16} />
                    </button>
                  </TooltipWrapper>
                </div>
                <div className="flex gap-1.5 px-1.5">
                  <TooltipWrapper sideOffset={10} label="Code" align="center">
                    <button
                      onClick={() => editor?.chain().focus().toggleCode().run()}
                      className={cn(
                        "bubble_button text-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed",
                        editor?.isActive("code") ? "is-bb-active" : ""
                      )}
                      disabled={editor?.isActive("codeBlock")}
                    >
                      <CodeIcon size={16} />
                    </button>
                  </TooltipWrapper>{" "}
                  <TooltipWrapper sideOffset={10} label="Bold" align="center">
                    <button
                      onClick={() =>
                        editor?.chain().focus().toggleCodeBlock().run()
                      }
                      className={cn(
                        "bubble_button text-neutral-100",
                        editor?.isActive("codeBlock") ? "is-bb-active" : ""
                      )}
                    >
                      <SquareTerminal size={16} />
                    </button>
                  </TooltipWrapper>
                </div>
              </div>
            </BubbleMenu>
          )}
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
