import { useSnippetStore } from "../store/snippetStore"
import { readTextFile, removeFile} from "@tauri-apps/api/fs";
import {desktopDir, join} from '@tauri-apps/api/path';
import {FiTrash, FiX} from "react-icons/fi"

interface props {
  snippetName: string;
}

function SnippetItem({snippetName}: props) {
  
  const setSelectedSnippet = useSnippetStore((state) => state.setSelectedSnippet);
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);
  const removeSnippet = useSnippetStore((state) => state.removeSnippet);

  const deleteSnippet = async (snippetName: string) => {
    const confirm = await window.confirm(`Are you sure you want to delete ${snippetName}?`)
    if (!confirm) return

    const destokPath = await desktopDir()
    await removeFile(await join(destokPath, "snippets", `${snippetName}.js`))
    removeSnippet(snippetName)
  }


  let texto:string = "";
  selectedSnippet?.name === snippetName ? texto = "bg-sky-500 flex justify-between" : texto = "px-4 py-2 hover:bg-zinc-900 hover:cursor-pointer flex justify-between"

  return (
    <div className={texto} onClick={async () => {
      const destokPath = await desktopDir();
      const contentSnippet = await readTextFile(await join(destokPath, "snippets", `${snippetName}.js`))
      setSelectedSnippet({name: snippetName, code: contentSnippet})
      }}>
      <h1>{snippetName}</h1>  
      {
        selectedSnippet?.name === snippetName && (
          <div className="flex gap-2 items-center justify-center">
            <FiTrash onClick={(e) => {
              e.stopPropagation()
              deleteSnippet(snippetName)}} className="text-neutral-500" />
            <FiX onClick={(e) => {
              e.stopPropagation()
              setSelectedSnippet(null)}} className="text-neutral-500" />
          </div>
        )
      }
    </div>
  )
}

export default SnippetItem