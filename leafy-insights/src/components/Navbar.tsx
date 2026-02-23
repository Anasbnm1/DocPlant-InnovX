import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Leaf, Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/diagnostic", label: "Diagnostic IA" },
  { to: "/guide", label: "Encyclopédie" },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "py-3 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-b border-zinc-200/50 dark:border-zinc-800/50"
            : "py-5 bg-transparent"
          }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group shrink-0"
            onClick={() => setOpen(false)}
          >
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Leaf className="h-6 w-6 text-primary" strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-zinc-900 dark:text-white text-xl tracking-tight">
              PlantDoc
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-white/50 dark:bg-white/5 backdrop-blur-md px-2 py-1.5 rounded-2xl border border-zinc-200/50 dark:border-white/10 shadow-sm">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${isActive
                      ? "bg-white dark:bg-zinc-800 text-primary shadow-sm ring-1 ring-zinc-200/50 dark:ring-white/10"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-white/5"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA / Right actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/diagnostic">
              <Button className="rounded-xl px-6 bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform hover:bg-primary/90">
                Faire un test
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-xl bg-white/50 backdrop-blur-md border border-zinc-200/50 shadow-sm"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5 text-zinc-800" /> : <Menu className="h-5 w-5 text-zinc-800" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-zinc-900/20 backdrop-blur-sm md:hidden animate-in fade-in duration-200" onClick={() => setOpen(false)}>
          <div
            className="absolute top-[80px] left-4 right-4 bg-white/95 backdrop-blur-xl border border-zinc-200 shadow-2xl rounded-3xl p-4 flex flex-col gap-2 animate-in slide-in-from-top-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-5 py-4 rounded-2xl text-base font-bold transition-all ${isActive
                      ? "bg-primary/10 text-primary"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                    }`}
                >
                  {link.label}
                  {isActive && <ChevronRight className="w-5 h-5 text-primary" />}
                </Link>
              );
            })}

            <div className="h-px bg-zinc-200/60 my-2" />

            <Link to="/diagnostic" onClick={() => setOpen(false)}>
              <Button className="w-full rounded-2xl h-14 bg-primary text-white font-bold text-lg shadow-lg shadow-primary/20">
                Lancer un diagnostic
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
