import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { forwardRef } from 'react';


const RTE = forwardRef(function RTE({ value = "", onChange, onInit },ref) { 
  return (
    <div>
      <Editor
        ref={ref}
        apiKey='no-api-key'
        initialValue={value}
        onInit={(evt, editor) => onInit && onInit(editor)}
        onEditorChange={(content) => onChange && onChange(content)}
        init={{
          height: 300,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </div>
  );
});

export default RTE