import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

import conf from "../config/config";

const RTE = ({ name = "content", control, label, defaultValue = "" }) => {
  // Render a TinyMCE editor integrated with React Hook Form
  return (
    <div className="mb-4 w-full">
      {label && (
        <label className="mb-1 inline-block pl-1 font-semibold">{label}</label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={conf.tinyMceKey}
            value={value}
            init={{
              branding: false,
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | alignleft aligncenter alignright alignjustify | bold italic strikethrough forecolor | bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family: Arial, Helvetica, sans-serif; font-size: 18px; }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default RTE;
