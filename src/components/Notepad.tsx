import React from "react";
import EditorJsTools from "./editorjs_tools";
import Editor from "@stfy/react-editor.js";

interface IEditorData {
    blocks: Array<any>
}

interface EditorProps {
    screenContent: any,
    saveData: (data: IEditorData) => void,
}

export function Notepad(props: EditorProps): JSX.Element {
    return (
        <Editor
            reinitOnPropsChange
            autofocus
            placeholder="Start here"
            tools={EditorJsTools}
            onReady={() => console.log('Start!')}
            onData={props.saveData}
            data={props.screenContent}
        /> 
    )
}