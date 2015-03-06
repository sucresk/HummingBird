package com.jasonEgret.jasontest;

import android.content.res.AssetManager;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.Surface;

public class JasonEgretJNI {
	public static void messageC2J(String from, String to, String subject, String body) {
		System.out.println("Message from c++: Subject: "+subject+" - Body: "+body);
		
		if (subject.equalsIgnoreCase("sound")){
		
		}
		else if (subject.equalsIgnoreCase("music")){
		
		}
		
	}
	 public native static void messageJ2C(String from, String to, String topic,
			 String body);
	 public native static void create(AssetManager assetManager);
	 public native static boolean init(Surface surface, String[] initArgs);
	 public native static void termWindow();
	 public native static boolean render();	
	 public native static void destroy();
	 public native static boolean onTouchEvent(MotionEvent event);
	 public native static boolean keyEvent(int action, int unicodeChar, int keyCode,
	 KeyEvent event);
	 public native static void sendSensor(int sensorType, float x, float y, float z);
	 public native static boolean attachBlenderFile(String path, int type);
	
}
