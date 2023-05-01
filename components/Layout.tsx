import Footer from "./Footer";
import Sidebar from "./Sidebar";
const Layout = ({ children }: any) => {
  return (
    <div className="flex space-x-12">
      <aside className="h-screen sticky top-0">
        <Sidebar />
      </aside>
      <main>
        <div className="bg-primary flex-1 p-4 text-black">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
