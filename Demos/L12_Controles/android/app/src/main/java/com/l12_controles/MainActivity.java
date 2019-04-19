package com.l12_controles;

import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.provider.ContactsContract;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.flaviofaria.kenburnsview.KenBurnsView;

import java.io.Console;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "L12_Controles";
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data){
        super.onActivityResult ( requestCode, resultCode, data);

        Log.e( "aaa1","回调得到内容");

        if (requestCode != 1 || resultCode!=RESULT_OK){
            return;
        }

        Uri contactData = data.getData ();

        Cursor cursor = managedQuery ( contactData,null,null,null,null );
        cursor.moveToFirst ();
        String num = getContactPhone ( cursor );

        Log.e( "aaa","获得电话号码:" +num);
        // 下面的话 就是将num发送给rn侧，需要条用nativeModule对象里面的方法
        MainApplication.getMyReactPackage ().myNativeModule.sendMsgToRn (num);
    }

    private String getContactPhone(Cursor cursor){
        int phoneColumn = cursor.getColumnIndex ( ContactsContract.Contacts.HAS_PHONE_NUMBER );
        int phoneNum = cursor.getInt ( phoneColumn );
        String result = "";
        if (phoneNum > 0){
            int idColumn = cursor.getColumnIndex ( ContactsContract.Contacts._ID);
            String contactId = cursor.getString ( idColumn );
            //从CommonDataKinds.Phone表获取联系人号码
            Cursor phone = getContentResolver().query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                    null,
                    ContactsContract.CommonDataKinds.Phone.CONTACT_ID + " = " + contactId,
                    null,
                    null);
            phone.moveToFirst();
            //因为上面根据ID值查找 所以结果只有一个
            result = phone.getString(phone.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
        }
        Log.e( "num","获得内容" +result);
        return result;
    }


}
