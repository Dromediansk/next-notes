import Navbar from "@/components/navigation/Navbar";
import { FC, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-screen-lg">{children}</main>
    </>
  );
};

export default Layout;
