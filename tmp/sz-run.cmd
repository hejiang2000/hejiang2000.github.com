@echo off

del /F /S /Q D:\hengrui\hejiang2000.github.com\tmp\sz-csv
del /F /S /Q D:\hengrui\hejiang2000.github.com\tmp\log.csv
REM del /F /S /Q D:\hengrui\hejiang2000.github.com\tmp\sz-xls
REM del /F /S /Q D:\hengrui\hejiang2000.github.com\tmp\sz-buy
REM del /F /S /Q D:\hengrui\hejiang2000.github.com\tmp\sz-sell
mkdir D:\hengrui\hejiang2000.github.com\tmp\sz-csv
REM mkdir D:\hengrui\hejiang2000.github.com\tmp\sz-xls
REM mkdir D:\hengrui\hejiang2000.github.com\tmp\sz-buy
REM mkdir D:\hengrui\hejiang2000.github.com\tmp\sz-sell

for /R D:\zd_pazq\vipdoc\sz\lday %%i in (*.day) do (
python convert.py %%i D:\hengrui\hejiang2000.github.com\tmp\sz-csv\%%~ni.csv
)

REM start /B cmd /C "C:\Program Files\Microsoft Office\Office15\EXCEL.EXE" D:\hengrui\hejiang2000.github.com\tmp\sz-marker.xlsm
