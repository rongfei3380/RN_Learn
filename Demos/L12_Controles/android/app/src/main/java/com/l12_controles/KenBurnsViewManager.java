package com.l12_controles;

import android.graphics.PorterDuff;
import android.graphics.drawable.Drawable;
import android.view.Display;
import android.widget.ImageView;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.flaviofaria.kenburnsview.KenBurnsView;

import java.io.IOException;
import java.io.InputStream;

import javax.annotation.Nonnull;

import static android.graphics.PorterDuff.Mode.SCREEN;

public class KenBurnsViewManager extends SimpleViewManager<KenBurnsView> {
    private ThemedReactContext mContext;

    @Nonnull
    @Override
    public String getName() {
        return "KenBurnsView";
    }

    @Nonnull
    @Override
    protected KenBurnsView createViewInstance(@Nonnull ThemedReactContext reactContext) {
        mContext = reactContext;
        KenBurnsView kenBurnsView = new KenBurnsView ( mContext );

        try {
            InputStream inputStream = mContext.getAssets ().open ( "country.jpg" );
            Drawable drawable = Drawable.createFromStream ( inputStream , null);
            kenBurnsView.setImageDrawable ( drawable );
        } catch (IOException e) {
            e.printStackTrace ();
        }
        return kenBurnsView;
    }

    @ReactProp ( name = "imgSource" )
    public void setSource(KenBurnsView view, String source){
        try {
            InputStream inputStream = mContext.getAssets ().open ( source );
            Drawable drawable = Drawable.createFromStream ( inputStream , null);
            drawable.setColorFilter ( 0xEE2C2C, SCREEN);
            view.setImageDrawable ( drawable );
        } catch (IOException e) {
            e.printStackTrace ();
        }
    }
}
