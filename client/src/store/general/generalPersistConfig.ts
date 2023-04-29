import storage from 'redux-persist/lib/storage';

export const generalPersistConfig = {
  key: 'general',
  storage,
  whitelist: ['showPopupAgain']
};
