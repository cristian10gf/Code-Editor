import { useEffect } from "react"
import { readDir } from "@tauri-apps/api/fs"
import {desktopDir} from '@tauri-apps/api/path'
import { useSnippetStore } from "../store/snippetStore"
import SnippetItem from "./SnippetItem"

function SnippetList() {

  const snippetsNames =   useSnippetStore((state) => state.snippetsNames);
  const setSnippetsNames =  useSnippetStore((state) => state.setSnippetsNames);

  async function loadFiles() {
    const destokPath = await desktopDir();
    const result = await readDir(`${destokPath}/snippets`)
    const filesNames = result.map(file => file.name!.split(".")[0]);
    setSnippetsNames(filesNames);
  }

  useEffect(() => {
    loadFiles()
  }, [])

  return (
    <div>
      {snippetsNames.map(snippetName => (
        <SnippetItem snippetName={snippetName} key={snippetName} />
      ))}
    </div>
    
  )
}

export default SnippetList