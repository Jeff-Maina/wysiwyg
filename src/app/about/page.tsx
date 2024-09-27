import Link from "next/link";

const Page = () => {
  return (
    <div className="w-full max-w-2xl pt-20 m-auto">
      <div className="mb-10">
        <Link
          href="/"
          className="text-sm text-neutral-500 underline hover:text-black"
        >
          Back to Home
        </Link>
      </div>
      <h1 className="font-semibold text-xl">About</h1>
      <br />
      <p className="!leading-relaxed text-neutral-700">
        This project was built to explore WYSIWYG (What You See Is What You Get)
        editors, with a focus on <b className="text-black">TipTap</b>. The goal
        was to recreate Slack's input UI and its key features using only TipTap.
        While some UI elements may need further polishing, the core
        functionality is fully implemented.
      </p>
      <h1 className="my-4 font-semibold text-xl">Features</h1>
      <ol className="list-disc list-inside text-neutral-700 flex flex-col gap-1">
        <li>
          Rich text formatting: support for Bold, Italic, Strikethrough, Lists,
          Inline Code, Code Blocks, and Links.
        </li>
        <li>Mentions for tagging users. <span className="text-orange-500">( pending )</span></li>
        <li>
          Bubble menu for quick formatting options when the main toolbar is
          hidden.
        </li>
        <li>
          Markdown support for common formatting shortcuts:
          <ul className="list-disc list-inside pl-6 flex flex-col gap-1">
            <li>
              <code className="about-code">**bold**</code> or{" "}
              <code className="about-code">__bold__</code> for bold text
            </li>
            <li>
              <code className="about-code">`inline code`</code> for inline code
            </li>
            <li>
              <code className="about-code">*italic*</code> or{" "}
              <code className="about-code">_italic_</code> for italic text
            </li>
            <li>
              <code className="about-code">~~strikethrough~~</code> for
              strikethrough text
            </li>
            <li>
              <code className="about-code">&gt;</code> for blockquotes
            </li>
            <li>
              <code className="about-code">*</code>,{" "}
              <code className="about-code">-</code>, or{" "}
              <code className="about-code">+</code> for bullet lists
            </li>
            <li>
              <code className="about-code">```</code> or{" "}
              <code className="about-code">---</code> for code blocks
            </li>
            <li>
              <code className="about-code">#</code> for headings
            </li>
            <li>
              <code className="about-code">1.</code> (or any number) for ordered
              lists
            </li>
          </ul>
        </li>
        <li>
          Predefined keyboard shortcuts for quick formatting, more details
          available{" "}
          <a
            className="text-blue-500"
            href="https://tiptap.dev/docs/editor/core-concepts/keyboard-shortcuts#predefined-keyboard-shortcuts"
            target="_blank"
          >
            here
          </a>
          .
        </li>
        <li>
          For additional features and details, visit{" "}
          <a
            className="text-blue-500"
            target="_blank"
            href="https://tiptap.dev/docs/editor/getting-started/overview"
          >
            TipTap's documentation
          </a>
          .
        </li>
      </ol>
    </div>
  );
};

export default Page;
