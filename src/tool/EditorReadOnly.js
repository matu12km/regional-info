import EditorJs from "react-editor-js";

import { EDITOR_JS_TOOLS } from "./richEditorTools";

export const ContentPageData = ({ data }) => {

  return (
    <>
      <EditorJs
        tools={EDITOR_JS_TOOLS}
        i18n={{
          messages: {},
        }}
        readOnly={true}
        data={data}
      />
    </>
  );
};
