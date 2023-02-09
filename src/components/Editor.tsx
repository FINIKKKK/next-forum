import React from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

import Header from "@editorjs/header";
import List from "@editorjs/list";

import ss from "./Editor.module.scss";

interface EditorProps {
  initialValue?: OutputData["blocks"];
  onChange: (blocks: OutputData["blocks"]) => void;
}

const Editor: React.FC<EditorProps> = ({ initialValue, onChange }) => {
  const isReady = React.useRef(false);

  React.useEffect(() => {
    if (!isReady.current) {
      const editor = new EditorJS({
        holder: "editor",
        data: {
          blocks: initialValue ? initialValue : [],
        },
        placeholder: "Введите текст вашей статьи",
        async onChange() {
          const { blocks } = await editor.save();
          onChange(blocks);
        },
        tools: {
          header: Header,
          list: List,
        },
      });

      isReady.current = true;
    }
  }, []);

  return <div id="editor"></div>;
};

export default Editor;
