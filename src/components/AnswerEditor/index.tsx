import React from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

import CodeBox from "@bomdi/codebox";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Header from "@editorjs/header";

import ss from "../Editor/Editor.module.scss";

interface AnswerEditorProps {
  className: string;
  initialValue?: OutputData["blocks"];
  onChange: (blocks: OutputData["blocks"]) => void;
}

const AnswerEditor: React.FC<AnswerEditorProps> = ({
  className,
  initialValue,
  onChange,
}) => {
  const isReady = React.useRef(false);

  React.useEffect(() => {
    if (!isReady.current) {
      const editor = new EditorJS({
        holder: "answer-editor",
        placeholder: "Введите ответ",
        data: {
          blocks: initialValue ? initialValue : [],
        },
        async onChange() {
          const { blocks } = await editor.save();
          onChange(blocks);
        },
        tools: {
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

  return <div className={`${className} ${ss.editor}`} id="answer-editor"></div>;
};

export default AnswerEditor;
