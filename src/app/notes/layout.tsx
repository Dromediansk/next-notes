import Sidebar from "@/components/navigation/Sidebar";
import { NoteStoreProvider } from "@/providers/notes.provider";
import { FC, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <NoteStoreProvider>
      <div className="flex items-center md:items-start flex-col md:flex-row">
        <Sidebar />
        <main className="p-2 w-full">{children}</main>
      </div>
    </NoteStoreProvider>
  );
};

export default Layout;
