import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { Link } from "react-router";

import { Button, Logo, Navigation } from "../index";

function Header() {
  // Manage mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Lock page scrolling while the sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  // Close the sidebar when switching to desktop
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = (event) => {
      if (!event.matches) return;

      setSidebarOpen(false);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-10 min-w-full">
        <nav className="flex items-center justify-between rounded-2xl bg-white/90 px-6 py-4 shadow-lg backdrop-blur-xl">
          {/* Logo */}
          <Link to="/">
            <Logo className="text-3xl font-bold" />
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-4 md:flex">
            <Navigation />
          </ul>

          {/* Mobile menu button */}
          <Button
            bgColor=""
            textColor="text-gray-700"
            className="transition hover:text-violet-600 md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
          >
            <HiOutlineMenuAlt3 size={30} />
          </Button>
        </nav>
      </header>

      {/* Background overlay */}
      <div
        className={`fixed inset-0 z-9 bg-black/40 backdrop-blur-sm transition-all duration-300 md:hidden ${
          sidebarOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 right-0 z-11 h-screen w-72 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <Logo className="font-bold" />

          <Button
            bgColor=""
            textColor="text-gray-700"
            className="transition hover:text-red-600"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation menu"
          >
            <HiX size={30} />
          </Button>
        </div>

        {/* Sidebar navigation */}
        <ul className="flex flex-col gap-2 p-5">
          <Navigation mobile onNavigate={() => setSidebarOpen(false)} />
        </ul>
      </aside>
    </>
  );
}

export default Header;
