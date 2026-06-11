import GlobalSearch from "../components/GlobalSearch";

export default function Search() {
  return (
    <div className="p-6 text-white bg-slate-950 min-h-screen">

      <h1 className="text-4xl font-bold mb-6">
        Global Search
      </h1>

      <GlobalSearch />

    </div>
  );
}