import { FC, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return <main className="py-4 h-full">{children}</main>;
};

export default Layout;
