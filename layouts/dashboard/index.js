import { Loader } from "components/Loader";
import { NavbarDashboard } from "components/navbar";
import { SidebarDashboard } from "components/sidebar";
import { AppContext } from "context/state";
import { useContext } from "react";

export default function LayoutDashboard({ children, menuActive, title }) {
  const { user, setUser, token, setToken, loading, setLoading } =
    useContext(AppContext);

  return (
    <main className="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative">
      {loading ? <Loader /> : ""}
      <div className="flex items-start justify-between">
        <div className="h-screen md:hidden lg:block shadow-lg relative w-80">
          <SidebarDashboard menuActive={menuActive} />
        </div>
        <div className="flex flex-col w-full md:space-y-4">
          <NavbarDashboard title={title} />

          {children}
        </div>
      </div>
    </main>
  );
}
