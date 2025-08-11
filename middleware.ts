// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Active le mode maintenance si la variable d'environnement est à 'true'
  const isInMaintenanceMode = process.env.MAINTENANCE_MODE === "true";

  // Si on est en maintenance ET que l'on n'est pas déjà sur la page /soon...
  if (isInMaintenanceMode && request.nextUrl.pathname !== "/soon") {
    // ...on affiche le contenu de la page /soon sans changer l'URL du navigateur.
    return NextResponse.rewrite(new URL("/soon", request.url));
  }

  return NextResponse.next();
}

// Filtre pour exclure les chemins qui doivent toujours être accessibles
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|soon).*)"],
};
