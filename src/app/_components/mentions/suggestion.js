import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";

import MentionList from "./mention-list.tsx";
const Users = [
  [
    "Lea Thompson",
    "Cyndi Lauper",
    "Tom Cruise",
    "Madonna",
    "Jerry Hall",
    "Joan Collins",
    "Winona Ryder",
    "Christina Applegate",
    "Alyssa Milano",
    "Molly Ringwald",
    "Ally Sheedy",
    "Debbie Harry",
    "Olivia Newton-John",
    "Elton John",
    "Michael J. Fox",
    "Axl Rose",
    "Emilio Estevez",
    "Ralph Macchio",
    "Rob Lowe",
    "Jennifer Grey",
    "Mickey Rourke",
    "John Cusack",
    "Matthew Broderick",
    "Justine Bateman",
    "Lisa Bonet",
  ],
];
export default {
  items: ({ query }) => {
    return Users.filter((item) =>
      item.toLowerCase().startsWith(query.toLowerCase())
    ).slice(0, 10);
  },

  render: () => {
    let reactRenderer;
    let popup;

    return {
      onStart: (props) => {
        if (!props.clientRect) {
          return;
        }

        const inputElement = document.querySelector(".editor"); // replace with your selector
        const clientRect = inputElement.getBoundingClientRect(); // Get the bounding rect of the input element

        reactRenderer = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        });

        popup = tippy("body", {
          getReferenceClientRect: () => clientRect,
          appendTo: () => document.body,
          content: reactRenderer.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "top-start",
        });
      },

      onUpdate(props) {
        reactRenderer.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props) {
        if (props.event.key === "Escape") {
          popup[0].hide();

          return true;
        }

        return reactRenderer.ref?.onKeyDown(props);
      },

      onExit() {
        popup[0].destroy();
        reactRenderer.destroy();
      },
    };
  },
};
