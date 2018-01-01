@echo off

del /F /S /Q D:\hengrui\hejiang2000.github.com\tmp\sz-csv
del /F /S /Q D:\hengrui\hejiang2000.github.com\tmp\sz-xls
del /F /S /Q D:\hengrui\hejiang2000.github.com\tmp\sz-buy
del /F /S /Q D:\hengrui\hejiang2000.github.com\tmp\sz-sell
mkdir D:\hengrui\hejiang2000.github.com\tmp\sz-csv
mkdir D:\hengrui\hejiang2000.github.com\tmp\sz-xls
mkdir D:\hengrui\hejiang2000.github.com\tmp\sz-buy
mkdir D:\hengrui\hejiang2000.github.com\tmp\sz-sell

for /R D:\zd_pazq\vipdoc\sz\lday %%i in (*.day) do (
python convert.py %%i D:\hengrui\hejiang2000.github.com\tmp\sz-csv\%%~ni.csv
)

start /B cmd /C "C:\Program Files\Microsoft Office\Office15\EXCEL.EXE" D:\hengrui\hejiang2000.github.com\tmp\sz-marker.xlsm
