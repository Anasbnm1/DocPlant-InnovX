import React from "react";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const Footer: React.FC = () => (
  <footer className="w-full bg-zinc-950 text-zinc-300 py-16 border-t border-zinc-900 mt-auto relative overflow-hidden">
    {/* Decorative blur */}
    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/2" />

    <div className="max-w-6xl mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-primary/20 p-2 rounded-xl">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <span className="font-extrabold text-2xl text-white tracking-tight">PlantDoc</span>
          </div>
          <p className="text-zinc-400 leading-relaxed max-w-sm">
            Diagnostic instantané de la santé de vos plantes par intelligence artificielle. Protéger la nature, un pixel à la fois.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Navigation</h4>
          <ul className="space-y-3 font-medium">
            <li><Link to="/" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Accueil</Link></li>
            <li><Link to="/diagnostic" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Diagnostic IA</Link></li>
            <li><Link to="/guide" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Encyclopédie</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact</h4>
          <ul className="space-y-3 font-medium">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
              <a href="mailto:contact@plantdoc.vision" className="hover:text-primary transition-colors">contact@plantdoc.vision</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
              Support 24/7
            </li>
          </ul>
        </div>

      </div>

      <div className="pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500 font-medium">
        <p>© 2026 PlantDoc Vision. Tous droits réservés.</p>
        <div className="flex items-center gap-6">
          <Link to="#" className="hover:text-zinc-300 transition-colors">Confidentialité</Link>
          <Link to="#" className="hover:text-zinc-300 transition-colors">CGU</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
