import React from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

import CodeBox from "@bomdi/codebox";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
// import SimpleImage from "@editorjs/simple-image";
import Header from "@editorjs/header";

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
          // embed: Embed,
          image: Image,
          header: Header,
          list: List,
          codeBox: CodeBox,
          linkTool: LinkTool,
          quote: Quote,
          delimiter: Delimiter,
          // inlineCode: InlineCode,
          // simpleImage: SimpleImage,
        },
      });

      isReady.current = true;
    }
  }, []);

  return <div id="editor"></div>;
};

export default Editor;
