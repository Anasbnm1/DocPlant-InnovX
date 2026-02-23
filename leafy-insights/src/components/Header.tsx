import { Leaf } from "lucide-react";

const Header = () => (
  <header className="w-full py-6 px-4 text-center">
    <div className="flex items-center justify-center gap-2 mb-2">
      <Leaf className="h-8 w-8 text-primary" strokeWidth={2.5} />
      <h1 className="text-2xl font-bold text-foreground tracking-tight">
        PlantDoc Vision
      </h1>
    </div>
    <p className="text-sm text-muted-foreground">
      Diagnostic instantané de la santé de vos plantes.
    </p>
  </header>
);

export default Header;
