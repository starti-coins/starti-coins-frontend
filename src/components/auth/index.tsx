import Image from "next/image";
import { PropsWithChildren } from "react";

function AuthSider({ children }: PropsWithChildren) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-tertiary relative hidden lg:block">
        <Image
          src="/img/login-bg.jpg"
          alt="Image"
          fill
          priority
          sizes="100%"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale opacity-10"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={"/img/logo-outlined.svg"}
            width={700}
            height={687}
            alt="Logo"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2">
          <a href="#" className="flex items-center gap-2 font-medium text-3xl">
            <div className="bg-tertiary text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <Image
                src="/img/logo.png"
                alt="Logo"
                width={24}
                height={24}
                className="size-6"
              />
            </div>
            Starti Coins
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthSider;
