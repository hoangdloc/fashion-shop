import { useState } from 'react';
import { fakeDelay } from '../utils/fakeDelay';

interface IUserFakeLoading {
  loading: boolean
  fakeLoading: () => Promise<void>
}

const SECONDS = 3;

export const useFakeLoading = (): IUserFakeLoading => {
  const [loading, setLoading] = useState<boolean>(false);

  const fakeLoading = async (): Promise<void> => {
    setLoading(true);
    await fakeDelay(SECONDS).then(() => {
      setLoading(false);
    });
  };

  return {
    loading,
    fakeLoading
  };
};
