@echo off
for /r D:\zd_pazq\vipdoc\sz\lday %%i in (*.day) do (
python convert.py %%i D:\hengrui\hejiang2000.github.com\tmp\csv\%%~ni.csv
)
