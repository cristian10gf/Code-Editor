import {Editor} from "@monaco-editor/react"
import { useSnippetStore } from "../store/snippetStore"
import { useEffect, useState } from "react";
import {writeTextFile} from '@tauri-apps/api/fs'
import {desktopDir} from '@tauri-apps/api/path'
import {TfiPencil} from "react-icons/tfi"

function SnippetEditor() {
  const snippet = useSnippetStore((state) => state.selectedSnippet);
  const [text, setText] = useState<string|undefined>("")
  

  useEffect(() => {
    if (!snippet) return

    const saveText = setTimeout(async () => {
      const destokPath =  await desktopDir()
      await writeTextFile(`${destokPath}/snippets/${snippet.name}.js`, text ?? "")
    }, 1000)

    return () => clearTimeout(saveText)
  }, [text])

  return (
    <>
    {snippet ? (
      <Editor theme="vs-dark" defaultLanguage="javascript" options={{fontSize: 20}} onChange={value => setText(value)} value={snippet.code ?? ""}/>
      ) : (<TfiPencil className="text-9xl text-neutral-500"/>)}
    </>
  )
}

export default SnippetEditor