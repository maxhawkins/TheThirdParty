package com.thirdparty;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import io.sentry.RNSentryPackage;
import im.shimo.react.prompt.RNPromptPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.magus.fblogin.FacebookLoginPackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFirebasePackage(),
            new FIRMessagingPackage(),
            new FastImageViewPackage(),
            new FIRMessagingPackage(),
            new RNSentryPackage(MainApplication.this),
            new RNPromptPackage(),
            new MapsPackage(),
            new VectorIconsPackage(),
            new LottiePackage(),
            new FacebookLoginPackage(),
            new CodePush("2JDFP1l00eQ7dPU_r-rUJsoXVcD-0ea16580-18e0-450a-a3b3-04abd361dcc6", getApplicationContext(), BuildConfig.DEBUG)
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
