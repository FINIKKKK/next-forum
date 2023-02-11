import React from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

import CodeBox from "@bomdi/codebox";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import ImageTool from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
import Header from "@editorjs/header";

import ss from "./Editor.module.scss";
import { Api } from "@/utils/api";

interface EditorProps {
  initialValue?: OutputData["blocks"];
  onChange: (blocks: OutputData["blocks"]) => void;
}


class MyImageTool extends ImageTool {
  renderSettings() {
    const div = document.createElement('div');
    div.style.marginTop = '-6px';
    return div;
  }
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
          // image: {
          //   class: Image,
          //   config: {
          //     uploader: {
          //       async uploadByFile(file: any) {
          //         const fileName = await Api().files.upload(file);
          //         return fileName;
          //       },
          //     },
          //   },
          // },
          image: {
            class: MyImageTool,
            config: {
              uploader: {
                async uploadByFile(file) {
                  // let storageRef = firebase.storage().ref();
                  // let imagesRef = storageRef
                  //   .child("EditorJS")
                  //   .child("images/" + file.name);
                  // let metadata = {
                  //   contentType: "image/jpeg",
                  // };
                  // let uploadTask = await imagesRef.put(file, metadata);
                  // const downloadURL = await uploadTask.ref.getDownloadURL();
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
          // linkTool: LinkTool,
          quote: Quote,
          delimiter: Delimiter,
          inlineCode: InlineCode,
          // simpleImage: SimpleImage,
        },
      });

      isReady.current = true;
    }
  }, []);

  return <div id="editor"></div>;
};

export default Editor;
