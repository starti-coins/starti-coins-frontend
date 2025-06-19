import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  { path: "/login", action: "redirect" },
  { path: "/register", action: "redirect" },
  { path: "/forgot-password", action: "redirect" },
] as const;

const redirectWheNotAuthenticated = "/login";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const isAuthenticated = request.cookies.get("token");

  if (publicRoute && isAuthenticated && publicRoute.action === "redirect") {
    // If the user is authenticated and trying to access a public route, redirect them to the dashboard
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!publicRoute && !isAuthenticated) {
    // If the user is not authenticated and trying to access a private route, redirect them to the default not authenticated page
    return NextResponse.redirect(
      new URL(redirectWheNotAuthenticated, request.url)
    );
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public folder (static assets)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|public|img).*)",
  ],
};
