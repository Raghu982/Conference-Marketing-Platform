import Sidebar from "../components/Sidebar";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({
  children,
}: Props) {
  return (
    <div className="flex min-h-screen bg-white text-black dark:bg-slate-950 dark:text-white transition-colors">
      <Sidebar />

      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}