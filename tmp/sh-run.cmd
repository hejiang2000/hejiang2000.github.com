@echo off

del /F /S /Q D:\hengrui\hejiang2000.github.com\tmp\sh-csv
del /F /S /Q D:\hengrui\hejiang2000.github.com\tmp\sh-xls
del /F /S /Q D:\hengrui\hejiang2000.github.com\tmp\sh-buy
del /F /S /Q D:\hengrui\hejiang2000.github.com\tmp\sh-sell
mkdir D:\hengrui\hejiang2000.github.com\tmp\sh-csv
mkdir D:\hengrui\hejiang2000.github.com\tmp\sh-xls
mkdir D:\hengrui\hejiang2000.github.com\tmp\sh-buy
mkdir D:\hengrui\hejiang2000.github.com\tmp\sh-sell

for /R D:\zd_pazq\vipdoc\sh\lday %%i in (*.day) do (
python convert.py %%i D:\hengrui\hejiang2000.github.com\tmp\sh-csv\%%~ni.csv
)

rem start /B cmd /C "C:\Program Files\Microsoft Office\Office15\EXCEL.EXE" D:\hengrui\hejiang2000.github.com\tmp\sh-marker.xlsm
