import { AppSidebar } from "@/components/Dashboard/app-sidebar";
import { ChartAreaInteractive } from "@/components/Dashboard/chart-area-interactive";
import { DataTable } from "@/components/Dashboard/data-table";
import { SectionCards } from "@/components/Dashboard/section-cards";
import { SiteHeader } from "@/components/Dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/@ui/sidebar";

import data from "../data.json";
import { MultiSelect } from "@/components/@ui/multi-select";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <MultiSelect
          items={[
            { value: "next.js", label: "Next.js" },
            { value: "sveltekit", label: "SvelteKit" },
            { value: "nuxt.js", label: "Nuxt.js" },
            { value: "remix", label: "Remix" },
            { value: "astro", label: "Astro" },
            { value: "wordpress", label: "WordPress" },
            { value: "express.js", label: "Express.js" },
            { value: "nest.js", label: "Nest.js" },
            { value: "vue.js", label: "Vue.js" },
            { value: "react.js", label: "React.js" },
            { value: "angular.js", label: "Angular.js" },
            { value: "flask", label: "Flask" },
            { value: "django", label: "Django" },
            { value: "laravel", label: "Laravel" },
            { value: "spring", label: "Spring" },
            { value: "ruby-on-rails", label: "Ruby on Rails" },
            { value: "asp.net", label: "ASP.NET" },
            { value: "fastapi", label: "FastAPI" },
            { value: "golang", label: "Golang" },
            { value: "kotlin", label: "Kotlin" },
            { value: "elixir", label: "Elixir" },
            { value: "c-sharp", label: "C#" },
            { value: "php", label: "PHP" },
            { value: "javascript", label: "JavaScript" },
            { value: "typescript", label: "TypeScript" },
            { value: "python", label: "Python" },
            { value: "java", label: "Java" },
            { value: "c-plus-plus", label: "C++" },
          ]}
          className="mt-2 w-fit max-w-2xs"
        />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
