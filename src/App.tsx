import SnippetEditor from "./components/SnippetEditor";
import SnippetList from "./components/SnippetList";
import SnippetForm from "./components/SnippetForm";

function App() {
  return (
    <div className=" h-screen text-white">
      <div className="col-span-3 bg-zinc-950">
        <SnippetEditor />
        <SnippetList />
      </div>
      <div className="flex justify-center col-span-9 bg-neutral-900">
        <SnippetForm />
      </div>
    </div>
  );
}

export default App;
