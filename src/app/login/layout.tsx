import { FC, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-[42rem] flex justify-center items-center">{children}</div>
  );
};

export default Layout;
