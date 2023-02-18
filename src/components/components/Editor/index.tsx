import React from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

import CodeBox from "@bomdi/codebox";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Header from "@editorjs/header";

import ss from "./Editor.module.scss";

import { Api } from "@/utils/api";

interface EditorProps {
  initialValue?: OutputData["blocks"];
  onChange: (blocks: OutputData["blocks"]) => void;
}

class MyImage extends Image {
  renderSettings() {
    const div = document.createElement("div");
    div.style.marginTop = "-6px";
    return div;
  }
}

const Editor: React.FC<EditorProps> = ({ initialValue, onChange }) => {
  const isReady = React.useRef(false);

  React.useEffect(() => {
    if (!isReady.current) {
      const editor = new EditorJS({
        holder: "editor",
        placeholder: "Текст",
        data: {
          blocks: initialValue ? initialValue : [],
        },
        async onChange() {
          const { blocks } = await editor.save();
          onChange(blocks);
        },
        tools: {
          image: {
            class: MyImage,
            config: {
              uploader: {
                async uploadByFile(file: any) {
                  const fileName = await Api().files.upload(file, "questions");
                  console.log(fileName);
                  return {
                    success: 1,
                    file: {
                      url: `http://localhost:7777/img/questions/${fileName}`,
                    },
                  };
                },
              },
            },
          },
          header: Header,
          list: List,
          codeBox: CodeBox,
          embed: Embed,
          quote: Quote,
          delimiter: Delimiter,
          inlineCode: InlineCode,
        },
      });

      isReady.current = true;
    }
  }, []);

  return <div className={ss.editor} id="editor"></div>;
};

export default Editor;
