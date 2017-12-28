@echo off

del /Q D:\hengrui\hejiang2000.github.com\tmp\csv\*.csv

for /R D:\zd_pazq\vipdoc\sz\lday %%i in (*.day) do (
python convert.py %%i D:\hengrui\hejiang2000.github.com\tmp\csv\%%~ni.csv
)

del /Q D:\hengrui\hejiang2000.github.com\tmp\xls\*.xls

start D:\hengrui\hejiang2000.github.com\tmp\marker.xlsm
