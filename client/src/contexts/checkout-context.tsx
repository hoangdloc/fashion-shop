import React, { createContext, useContext } from 'react';
import { useFakeLoading } from '~/shared/hooks/useFakeLoading';

interface ICheckoutContext {
  loading: boolean
  fakeLoading: () => Promise<void>
}

const CheckoutContext = createContext<ICheckoutContext | null>(null);

const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { loading, fakeLoading } = useFakeLoading();

  const values = { loading, fakeLoading };

  return (
    <CheckoutContext.Provider value={values}>
      {children}
    </CheckoutContext.Provider>
  );
};

function useCheckout (): ICheckoutContext {
  const context = useContext(CheckoutContext);
  if (context == null) {
    throw new Error('useCheckout must be used within CheckoutProvider');
  }
  return context;
}

export { CheckoutProvider, useCheckout };
