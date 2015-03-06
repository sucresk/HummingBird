@echo off
pushd %~dp0
set BINARY_NAME=JasonEgret3D

if exist %~dp0bin rmdir /s /q %~dp0bin

call android update project --name JasonEgret3D --path %~dp0

if "%1" == "" (
	call ant release
	if not exist "egret-release-key.keystore" call keytool -genkey -v -keystore egret-release-key.keystore -alias alias_egret -keyalg RSA -keysize 2048 -validity 10000 -keypass 123456 -storepass 123456

	call jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore egret-release-key.keystore bin\%BINARY_NAME%-release-unsigned.apk alias_egret -keypass 123456 -storepass 123456

	call jarsigner -verify -verbose -certs bin\%BINARY_NAME%-release-unsigned.apk

	call zipalign -v 4 bin\%BINARY_NAME%-release-unsigned.apk bin\%BINARY_NAME%.apk
) else (
	call ant debug
)


pause