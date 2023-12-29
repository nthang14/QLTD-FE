import HeaderApp from "~/components/layout/header/Header";
import UserNavigation from "~/components/layout/navigation/UserNavigation";

export default function UserLayout({ children }: any) {
  return (
    <>
      <div className="h-screen">
        <HeaderApp />
        <div className="min-h-custom flex">
          <div>
            <UserNavigation />
          </div>
          <div className="bg-primary-01 pl-[30px] 2xl:pl-[96px] 2xl:pr-[88px] pr-[30px] py-[24px] w-full">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
