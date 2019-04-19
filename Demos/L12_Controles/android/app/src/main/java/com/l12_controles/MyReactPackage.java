package com.l12_controles;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.annotation.Nonnull;


public class MyReactPackage implements ReactPackage {

    public MyNativeModule myNativeModule;

    @Nonnull
    @Override
    public List<NativeModule> createNativeModules(@Nonnull ReactApplicationContext reactContext) {

        myNativeModule = new MyNativeModule ( reactContext );

        List<NativeModule> modules = new ArrayList<>();
        modules.add(myNativeModule);

        return modules;
    }

//    @Nonnull
//    @Override
//    public List<Class<? extends JavaScriptModule>> createJSModules() {
//        return Collections.emptyList();ReactContextBaseJavaModule
//    }

    @Nonnull
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new KenBurnsViewManager ()
        );
    }


}
