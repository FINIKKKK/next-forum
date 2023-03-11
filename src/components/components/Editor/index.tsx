import ss from "./Editor.module.scss";
import { Api } from "@/utils/api";
import CodeBox from "@bomdi/codebox";
import Delimiter from "@editorjs/delimiter";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import React from "react";

interface EditorProps {
  initialValue?: OutputData["blocks"];
  onChange: (blocks: OutputData["blocks"]) => void;
  isAnswer?: boolean;
  placeholder: string;
  className?: string;
  refEditor?: any;
}

class MyImage extends Image {
  renderSettings() {
    const div = document.createElement("div");
    div.style.marginTop = "-6px";
    return div;
  }
}

const Editor: React.FC<EditorProps> = ({
  initialValue,
  onChange,
  isAnswer,
  placeholder,
  className,
}) => {
  const isReady = React.useRef(false);

  React.useEffect(() => {
    if (!isReady.current) {
      const editor = new EditorJS({
        holder: "editor",
        placeholder: placeholder,
        data: {
          blocks: initialValue ? initialValue : [],
        },
        async onChange() {
          const { blocks } = await editor.save();
          onChange(blocks);
        },
        tools: {
          ...(!isAnswer && {
            image: {
              class: MyImage,
              config: {
                uploader: {
                  async uploadByFile(file: any) {
                    const fileName = await Api().files.upload(
                      file,
                      "questions"
                    );
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
          }),
          ...(!isAnswer && { header: Header }),
          ...(!isAnswer && { quote: Quote }),
          ...(!isAnswer && { delimiter: Delimiter }),
          embed: Embed,
          list: List,
          codeBox: CodeBox,
          inlineCode: InlineCode,
        },
      });

      isReady.current = true;
    }
  }, []);

  return <div className={`${className} ${ss.editor}`} id="editor"></div>;
};

export default Editor;
