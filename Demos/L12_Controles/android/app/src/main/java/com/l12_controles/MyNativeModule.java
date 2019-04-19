package com.l12_controles;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import static android.app.Activity.RESULT_OK;

public class MyNativeModule extends ReactContextBaseJavaModule implements ActivityEventListener, LifecycleEventListener {

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<> (  );
        constants.put ( "URL", "https://github.com/rongfei3380/");
        constants.put ( "port", "8081");
        constants.put ( "ip", "192.168.31.7" );
        constants.put ( "author", "chengfeir" );
        constants.put ( "QQ", "327568823" );

        return constants;
    } // 跨语言常量

    private ReactApplicationContext mContext;
    public MyNativeModule(ReactApplicationContext reactContext){
        super(reactContext);
        mContext = reactContext;

        // 在构造函数中 注册生命周期事件的监听接口
        mContext.addActivityEventListener ( this );
        mContext.addLifecycleEventListener ( this );
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

        Intent intent = new Intent ( mContext, TestActivity.class );

        intent.setFlags ( Intent.FLAG_ACTIVITY_NEW_TASK ); // 必须的，否则报错

        mContext.startActivity ( intent );
    }

    @ReactMethod
    public void rnCallContactsList(){
        Toast.makeText(mContext, "调起联系人页面", Toast.LENGTH_SHORT).show();

        Intent intent = new Intent( Intent.ACTION_PICK, ContactsContract.Contacts.CONTENT_URI);
        intent.setType(ContactsContract.Contacts.CONTENT_TYPE);

        Bundle bundle = new Bundle();
        mContext.startActivityForResult ( intent,1,bundle);
    }

    public void sendMsgToRn(String msg){
        Log.e ("sendMsgToRn","发给RN侧的数据：" +msg);
//        将消息msg发送给RN侧
        mContext.getJSModule ( DeviceEventManagerModule.RCTDeviceEventEmitter.class ).emit ( "AndroidToRNMessage", msg );
    }

    @ReactMethod
    public void measureLayout(Callback errorCallBack, Callback successCallBack){
        try {
            successCallBack.invoke ( 100, 100, 200, 200 );
        } catch (IllegalViewOperationException e){
            errorCallBack.invoke ( e.getMessage () );
        }
    }

    @ReactMethod
    public void rnCallNative_promise(String msg, Promise promise){
        try {
            Toast.makeText ( mContext, msg, Toast.LENGTH_SHORT).show ();
            String componentName = getCurrentActivity ().getComponentName ().toString ();
            promise.resolve ( componentName );
        }catch (Exception e){
            promise.reject ( "100", e.getMessage () );
        }
    }

    @ReactMethod
    public void rnCallNativeListener(String string){
        Intent intent = new Intent ( Intent.ACTION_PICK, ContactsContract.Contacts.CONTENT_URI );
        Bundle bundle = new Bundle (  );
        mContext.addActivityEventListener (this); // 增加监听 让当前类的onActivityResult来处理
        mContext.startActivityForResult ( intent, 1, bundle );
    }

    // 以下两个方法 是addActivityEventListener 之后要重写的 并且 引入 import com.facebook.react.bridge.ActivityEventListener;
    // 类需要 implements ActivityEventListener
    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if (requestCode!=1 || resultCode!=RESULT_OK) return;

        sendMsgToRn ( "在原生模块类里实现监听接口ActivityEventListener！" );
    }

    @Override
    public void onNewIntent(Intent intent) {
        Log.i ("i","onNewIntent");
    }


    // LifecycleEventListener 的接口方法
    @Override
    public void onHostResume() {
        Log.i ("i","onHostResume");
    }

    @Override
    public void onHostPause() {
        Log.i ("i","onHostPause");
    }

    @Override
    public void onHostDestroy() {
        Log.i ("i","onHostDestroy");
    }
}
