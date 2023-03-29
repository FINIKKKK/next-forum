import CodeBox from '@bomdi/codebox';
import Delimiter from '@editorjs/delimiter';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import InlineCode from '@editorjs/inline-code';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import React from 'react';

import { Api } from '@/utils/api';

import ss from './Editor.module.scss';

interface EditorProps {
  initialValue?: OutputData['blocks'];
  onChange: (blocks: OutputData['blocks']) => void;
  placeholder: string;
  className?: string;
  type: string;
  editorRef?: any;
  isClear?: any;
}

class MyImage extends Image {
  renderSettings() {
    const div = document.createElement('div');
    div.style.marginTop = '-6px';
    return div;
  }
}

const Editor: React.FC<EditorProps> = ({
  initialValue,
  onChange,
  placeholder,
  className,
  type,
  isClear,
}) => {
  const editor = React.useRef<EditorJS | null>(null);
  const isReady = React.useRef(false);

  React.useEffect(() => {
    if (!isReady.current) {
      editor.current = new EditorJS({
        holder: 'editorjs',
        placeholder: placeholder,
        data: {
          blocks: initialValue ? initialValue : [],
        },
        async onChange() {
          const { blocks } = await editor.current.save();
          onChange(blocks);
        },
        tools: {
          ...(type !== 'answer' && {
            image: {
              class: MyImage,
              config: {
                buttonContent: 'Выберите изображение',
                uploader: {
                  async uploadByFile(file: any) {
                    const fileName = await Api().files.upload(
                      file,
                      'questions',
                    );
                    return {
                      success: 1,
                      file: {
                        url: `${fileName}`,
                      },
                    };
                  },
                },
              },
            },
          }),
          ...(type !== 'answer' && type !== 'question' && { header: Header }),
          ...(type !== 'answer' &&
            type !== 'question' && {
              quote: {
                class: Quote,
                inlineToolbar: true,
                config: {
                  quotePlaceholder: 'Введите цитату',
                  captionPlaceholder: 'Введите автора',
                },
              },
            }),
          ...(type !== 'answer' && { delimiter: Delimiter }),
          embed: Embed,
          list: List,
          codeBox: CodeBox,
          inlineCode: InlineCode,
        },
      });

      isReady.current = true;
      return () => {
        editor.current?.destroy();
      };
    }
  }, []);

  React.useEffect(() => {
    if (editor.current && isClear) {
      editor.current.blocks.clear();
    }
  }, [isClear]);

  return <div className={`${className} ${ss.editor}`} id="editorjs"></div>;
};

export default Editor;
