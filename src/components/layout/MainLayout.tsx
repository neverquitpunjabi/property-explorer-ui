
import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
