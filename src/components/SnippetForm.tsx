import {writeTextFile} from '@tauri-apps/api/fs'
import {desktopDir} from '@tauri-apps/api/path'
import { useState } from 'react'
import { useSnippetStore } from '../store/snippetStore'

function SnippetForm() {

    const [snippetName, setSnippetName] = useState("")
    const addSnippet = useSnippetStore((state) => state.addSnippet);

    return (
        <form onSubmit={ async (e) => {
            e.preventDefault()
            const destokPath = await desktopDir()
            await writeTextFile(`${destokPath}/snippets/${snippetName}.js`, "{}")
            setSnippetName("")
            addSnippet(snippetName)
        }}>
            <input type="text" placeholder="write a snippet" onChange={(e) => setSnippetName(e.target.value)}
                   className="bg-zinc-900 w-full border-none p-4 outline-none" value={snippetName}/>
            <button className="hiden">Save</button>
        </form>
    )
}

export default SnippetForm