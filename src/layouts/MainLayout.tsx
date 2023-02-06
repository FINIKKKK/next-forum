import { Footer, Header } from "@/components";

type MainLayoutsProps = {
  children: any;
};

export const MainLayout: React.FC<MainLayoutsProps> = ({ children }) => {
  return (
    <>
      <Header />
      
      {children}

      <Footer />
    </>
  );
};
