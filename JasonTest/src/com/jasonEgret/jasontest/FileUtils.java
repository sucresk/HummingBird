package com.jasonEgret.jasontest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import android.content.res.AssetManager;
import android.os.Handler;
import android.util.Log;

public final class FileUtils {

	public static void downLoadFile(final String path,final String outPath,final Handler handler)
	{
		final File outFile = new File(outPath);
		if(outFile.exists() && outFile.isFile())outFile.delete();
				
		new Thread(new Runnable() {
			public void run() {
				InputStream input = null;
				FileOutputStream output =null;
				
				HttpURLConnection connect = null;
				try {
					URL _url = new URL(path);
					connect = (HttpURLConnection) _url.openConnection();
					connect.setRequestProperty("Accept-Encoding", "identity");
					connect.setConnectTimeout(3000);
					connect.connect();

					if (connect.getResponseCode() != HttpURLConnection.HTTP_OK) {
						Log.i("JNI",
								"Server returned HTTP "
										+ connect.getResponseCode() + " "
										+ connect.getResponseMessage());
						return;
					}

					input = connect.getInputStream();
					output = new FileOutputStream(outFile);

					int fileLength = connect.getContentLength();
					byte data[] = new byte[1024 * 4];
					long total = 0;
					int count;
					while ((count = input.read(data)) != -1) {
						total += count;
						if (fileLength > 0)
						{
							Log.i("FileUtils", "loading" + total * 100 / fileLength);
						}
						output.write(data, 0, count);
					}

				} catch (Exception e) {
					e.printStackTrace();
					Log.e("FileUtils", "load  error");
				} finally {
					try {
						input.close();
					} catch (IOException e) {
						Log.e("FileUtils", "input close error");
					}

					if (connect != null)
						connect.disconnect();
					handler.sendEmptyMessage(0);
				}
			}
		}).start();
	}
	public static boolean copyAssets(AssetManager assetManager,
			String targetFolder) throws Exception {
		Log.i("FileUtils", "Copying files from assets to folder "
				+ targetFolder);
		return copyAssets(assetManager, "", targetFolder);
	}

	public static boolean copyAssets(AssetManager assetManager, String path,
			String targetFolder) throws Exception {
		Log.i("FileUtils", "Copying " + path + " to " + targetFolder);
		String sources[] = assetManager.list(path);
		if (sources.length == 0) {
			copyAssetFileToFolder(assetManager, path, targetFolder);
		} else { // its a folder:
			if (path.startsWith("images") || path.startsWith("sounds")
					|| path.startsWith("webkit")) {
				Log.i("FileUtils", "  > Skipping " + path);
				return false;
			}
			File targetDir = new File(targetFolder, path);
			targetDir.mkdirs();
			for (String source : sources) {
				String fullSourcePath = path.equals("") ? source : (path
						+ File.separator + source);
				copyAssets(assetManager, fullSourcePath, targetFolder);
			}
		}
		return true;
	}

	private static void copyAssetFileToFolder(AssetManager assetManager,
			String fullAssetPath, String targetBasePath) throws IOException {
		InputStream in = assetManager.open(fullAssetPath);
		OutputStream out = new FileOutputStream(new File(targetBasePath,
				fullAssetPath));
		byte[] buffer = new byte[16 * 1024];
		int read;
		while ((read = in.read(buffer)) != -1) {
			out.write(buffer, 0, read);
		}
		in.close();
		out.flush();
		out.close();
	}
}


