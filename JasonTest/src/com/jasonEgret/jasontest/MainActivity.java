package com.jasonEgret.jasontest;

import java.util.HashMap;

import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.content.res.AssetManager;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.MotionEvent;
import android.view.Surface;
import android.view.SurfaceHolder;
import android.view.SurfaceHolder.Callback;
import android.view.SurfaceView;
import android.view.Window;
import android.view.WindowManager;

public class MainActivity extends Activity {
	public static final int BLENDER_APK_LOCAL = 0;
	public static final int BLENDER_URL = 1;

	// protected String blenderFile = "jason_demo.blend";
	protected String blenderFile = "http://192.168.1.100/assets/jason_demo.blend";

	protected int blenderFileType = BLENDER_URL;

	protected SurfaceView surfaceView = null;
	protected Surface lastSurface = null;
	protected Handler handler = null;
	protected HashMap<String, String> initArgs = null;

	private Runnable renderer = null;
	private boolean paused = false;
	private boolean initJasonEgret = false;
	private AssetManager assetMgr = null;
	private boolean wndCreate = false;
	private String localStorage = null;

	@Override
	public void onCreate(Bundle savedInstanceState) {

		setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);

		requestWindowFeature(Window.FEATURE_NO_TITLE);
		getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
				WindowManager.LayoutParams.FLAG_FULLSCREEN);

		super.onCreate(savedInstanceState);

		localStorage = Environment.getExternalStorageDirectory()
				.getAbsolutePath() + "/blenderTemp.blender";

		handler = new Handler() {
			@Override
			public void handleMessage(Message msg) {
				if (msg.what == 0) {
					JasonEgretJNI.attachBlenderFile(
							blenderFileType == BLENDER_URL ? localStorage
									: blenderFile, blenderFileType);
				}
			}

		};

		initArgs = new HashMap<String, String>();
		initArgs.put("debugFps", "--debugFps 1");

		Log.i("JNI", "JNI onCreate");

		sysInit();

	}

	@Override
	public boolean onTouchEvent(MotionEvent event) {
		boolean ret = super.onTouchEvent(event);
		if (!ret)
			return JasonEgretJNI.onTouchEvent(event);
		return ret;

	}

	@Override
	protected void onPause() {
		Log.i("JNI", "JNI onPause");

		super.onPause();
		handler.removeCallbacks(renderer);
		paused = true;
	}

	@Override
	protected void onResume() {
		Log.i("JNI", "JNI onResume");
		super.onResume();
		paused = false;
		handler.post(renderer);
	}

	@Override
	protected void onDestroy() {
		super.onDestroy();
		Log.i("JNI", "JNI onDestroy");
		Runnable destroyer = new Runnable() {
			public void run() {
				JasonEgretJNI.destroy();
				System.exit(0);
			}
		};
		handler.post(destroyer);
	}

	private void sysInit() {

		final Runnable initRunnable = new Runnable() {
			public void run() {
				if (!initJasonEgret) {
					initJasonEgret = true;
					Log.i("JNI", "initRunnable run");
					JasonEgretJNI.create(getAssetMgr());

					renderer = new Runnable() {
						public void run() {

							if (paused)
								return;

							if (!wndCreate && lastSurface != null) {
								String[] args = initArgs.values().toArray(
										new String[initArgs.size()]);
								wndCreate = JasonEgretJNI.init(lastSurface,
										args);

								if (blenderFileType == BLENDER_URL)
									FileUtils.downLoadFile(blenderFile,
											localStorage, handler);
								else
									handler.sendEmptyMessage(0);

								handler.post(this);
								return;
							}

							if (initJasonEgret && wndCreate) {
								JasonEgretJNI.render();
							}

							handler.post(this);
						}
					};

					handler.post(renderer);
				}
			}

		};

		SurfaceView view = new SurfaceView(this);
		SurfaceHolder holder = view.getHolder();
		surfaceView = view;
		holder.addCallback(new Callback() {
			public void surfaceCreated(SurfaceHolder holder) {
				if (holder.getSurface() != null
						&& holder.getSurface().isValid()) {
					Log.i("JNI", "JNI surfaceCreated");

					lastSurface = holder.getSurface();
					handler.post(initRunnable);
				}
			}

			public void surfaceDestroyed(SurfaceHolder holder) {
				if (initJasonEgret && wndCreate) {
					wndCreate = false;
					lastSurface = null;
					handler.post(new Runnable() {
						public void run() {
							Log.i("JNI", "JNI surfaceDestroyed");
							JasonEgretJNI.termWindow();
						}
					});
				}
			}

			public void surfaceChanged(SurfaceHolder holder, int format,
					int width, int height) {
				initArgs.put("width", "--width " + width);
				initArgs.put("height", "--height " + height);

			}
		});
		setContentView(surfaceView);

	}

	public AssetManager getAssetMgr() {
		if (assetMgr == null) {
			assetMgr = getResources().getAssets();
		}
		return assetMgr;
	}

	static {
		System.loadLibrary("JasonEgret");
	}
}
