package com.ssisac.genoxxrn

import android.os.Build
import android.os.Bundle
import android.graphics.Color
import android.view.View
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.content.Intent;
import android.content.res.Configuration;

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
      super.onCreate(null)
      
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
          window.apply {
              // Hace la barra de navegación transparente
              navigationBarColor = Color.TRANSPARENT
  
              // Oculta el fondo sólido y permite que la vista se dibuje detrás
              decorView.systemUiVisibility =
                  View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION or
                  View.SYSTEM_UI_FLAG_LAYOUT_STABLE
  
              // Opcional: Si también quieres ocultar la barra de estado
              // decorView.systemUiVisibility = decorView.systemUiVisibility or
              //     View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
          }
      }
  }
    
  override fun onConfigurationChanged(newConfig: Configuration) {
      super.onConfigurationChanged(newConfig)
      val intent = Intent("onConfigurationChanged")
      intent.putExtra("newConfig", newConfig)
      this.sendBroadcast(intent)
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "genoxxApp"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
