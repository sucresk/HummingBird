@echo off
del /q /s "%cd%\*.js"
del /q /s "%cd%\*.js.map"
del /q /s "%cd%\Thumbs.db"
del /f /s /q /a:h-s "%cd%\*.suo"
rd /q /s "%cd%\BlackSwan3D\bin"
rd /q /s "%cd%\BlackSwan3D\obj"