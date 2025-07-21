import AccountProvider from "./account/provider";
import CoinsProvider from "./coins/provider";

const PrivateProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AccountProvider>
      <CoinsProvider>{children}</CoinsProvider>
    </AccountProvider>
  );
};

export default PrivateProvider;
