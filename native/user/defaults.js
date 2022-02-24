import DefaultPreference from 'react-native-default-preference';

export const userWalletDefaultSettingsKey = 'user_current_wallet';

export const currentUserWallet = async () => {
  try {
    return await DefaultPreference.get(userWalletDefaultSettingsKey);
  } catch (e) {
    throw e;
  }
};

export const saveUserWalletSetting = async wallet_id => {
  try {
    return await DefaultPreference.set(userWalletDefaultSettingsKey, wallet_id);
  } catch (e) {
    throw e;
  }
};
