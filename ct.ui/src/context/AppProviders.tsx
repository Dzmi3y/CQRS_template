import AccountProvider from "./Account/AccountProvider.tsx";
import CartProvider from "./Cart/CartProvider.tsx";

interface Props {
  children: React.ReactNode;
}

export const AppProviders = ({ children }: Props) => {
  return (
    <AccountProvider>
      <CartProvider>{children}</CartProvider>
    </AccountProvider>
  );
};
