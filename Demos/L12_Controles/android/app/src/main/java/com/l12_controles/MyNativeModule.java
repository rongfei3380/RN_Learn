package com.l12_controles;

import android.content.Context;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

public class MyNativeModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext mContext;

    public MyNativeModule(ReactApplicationContext reactContext){
        super(reactContext);
        mContext = reactContext;
    }

    @Nonnull
    @Override
    public String getName() {
        return "MyNativeModule";
    }

    // 函数不能有返回值，因为被调用的原生代码是异步的，原生代码执行结束之后只能通过回调函数或者发送消息给rn那边
    @ReactMethod
    public void rnCallNative(String msg){
        Toast.makeText(mContext,msg, Toast.LENGTH_SHORT).show();
    }
}
