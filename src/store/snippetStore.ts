import { create} from "zustand";

interface snippet {
    name: string;
    code: string|null;
}


interface SnippetState {
    snippetsNames: string[];
    addSnippet: (snippetName: string) => void;  
    setSnippetsNames: (snippetsNames: string[]) => void; 
    selectedSnippet: snippet|null; 
    setSelectedSnippet: (snippet: snippet | null) => void;
    removeSnippet: (snippetName: string) => void;
}

export const useSnippetStore = create <SnippetState>((set) => ({
    snippetsNames: [],
    selectedSnippet: null,
    addSnippet: (snippetName: string) => set((state) => ({snippetsNames: [...state.snippetsNames, snippetName] })),
    setSnippetsNames: (snippetsNames: string[]) => set({snippetsNames: snippetsNames}),
    setSelectedSnippet: (snippet) => set({selectedSnippet: snippet}),
    removeSnippet: (snippetName: string) => set((state) => ({snippetsNames: state.snippetsNames.filter((name) => name !== snippetName)})),
}));

