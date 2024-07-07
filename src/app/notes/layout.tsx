import Navbar from "@/components/navigation/Navbar";
import { NoteStoreProvider } from "@/providers/notes.provider";
import { FC, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <NoteStoreProvider>
      <Navbar />
      <main className="mx-auto max-w-screen-lg">{children}</main>
    </NoteStoreProvider>
  );
};

export default Layout;
