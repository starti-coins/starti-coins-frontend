import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/token/token";

type PublicRoute =
  | {
      path: string;
      action: "redirect" | "allow";
      allowSubdomain: boolean;
      subdoaminDepth: number;
    }
  | {
      path: string;
      action: "redirect" | "allow";
      allowSubdomain?: undefined;
      subdoaminDepth?: undefined;
    };

const publicRoutes: PublicRoute[] = [
  { path: "/login", action: "redirect" },
  // { path: "/register", action: "redirect" },
  {
    path: "/forgot-password",
    action: "allow",
    allowSubdomain: true,
    subdoaminDepth: 1,
  },
];

const SPLITED_PATH_LENGTH_WITHOUT_SUBDOMAIN = 2;
const redirectWheNotAuthenticated = "/login";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) =>
    route.allowSubdomain &&
    path.split("/").length <=
      route.subdoaminDepth + SPLITED_PATH_LENGTH_WITHOUT_SUBDOMAIN
      ? path.startsWith(route.path)
      : route.path === path
  );
  const token = request.cookies.get("token");
  const { payload: isAuthenticated } = await verifyToken(
    token?.value || ""
  ).catch(() => {
    return { payload: null };
  });

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
