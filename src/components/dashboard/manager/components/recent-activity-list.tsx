import Image from "next/image";
import { Button } from "@/components/@ui/button";
import { Users } from "lucide-react";

async function RecentActivityList() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map(async (_, index) => {
        return (
          <div
            key={index}
            className="border shadow rounded-md py-4 px-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
          >
            <Image
              src="https://plus.unsplash.com/premium_photo-1661335257817-4552acab9656?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={1665}
              height={776}
              alt="project image"
              className="rounded-md mb-4"
            />
            <div className="flex items-center justify-between">
              <span className="font-medium">
                Projeto 1: Locadora de Imóveis
              </span>
              <Button variant="ghost" size="icon">
                <Users className="size-5" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RecentActivityList;
