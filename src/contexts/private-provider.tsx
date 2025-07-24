import CoinsProvider from "./coins/provider";

const PrivateProvider = ({ children }: { children: React.ReactNode }) => {
  return <CoinsProvider>{children}</CoinsProvider>;
};

export default PrivateProvider;
