// @flow

import { AccessToken, LoginManager } from "react-native-fbsdk";

type FBLoginResult = {|
  +userID: string,
  +accessToken: string,
|};
export interface FBLogin {
  login(): Promise<?FBLoginResult> ;
}

export default class FBManagerLogin implements FBLogin {

  async login(): Promise<?FBLoginResult> {
    await LoginManager.logOut();

    const result = await LoginManager.logInWithReadPermissions(["public_profile", "email"]);
    if (result.isCancelled) {
      return null;
    }

    const token = await AccessToken.getCurrentAccessToken();
    if (!token) {
      throw new Error('fb login failed');
    }

    return {
      userID: token.userID,
      accessToken: token.accessToken
    };
  }
}
