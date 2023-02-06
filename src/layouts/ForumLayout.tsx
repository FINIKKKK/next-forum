import { Footer, Header, Sidebar } from "@/components";

type ForumLayoutsProps = {
  children: any;
};

export const ForumLayout: React.FC<ForumLayoutsProps> = ({ children }) => {
  return (
    <>
      <Header />

      <main className="main">
        <div className="container">
          <div className="main__inner">
            <Sidebar />

            {children}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};
