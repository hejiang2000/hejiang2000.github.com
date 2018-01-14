@echo off

del /F /S /Q D:\hengrui\hejiang2000.github.com\tmp\sz-csv
mkdir        D:\hengrui\hejiang2000.github.com\tmp\sz-csv
del /F /S /Q D:\hengrui\hejiang2000.github.com\tmp\sz-000000-old.csv
del /F /S /Q D:\hengrui\hejiang2000.github.com\tmp\sz-300000-old.csv
ren          D:\hengrui\hejiang2000.github.com\tmp\sz-000000.csv sz-000000-old.csv
ren          D:\hengrui\hejiang2000.github.com\tmp\sz-300000.csv sz-300000-old.csv

echo 股票代码,结余,盈利,亏损 > D:\hengrui\hejiang2000.github.com\tmp\sz-000000.csv
echo 股票代码,结余,盈利,亏损 > D:\hengrui\hejiang2000.github.com\tmp\sz-300000.csv

for /R D:\zd_pazq\vipdoc\sz\lday %%i in (*.day) do (
    for /f "tokens=2 delims=z" %%j in ("%%~ni") do (
        if "%%j" lss "010000" (
            python convert.py %%i D:\hengrui\hejiang2000.github.com\tmp\sz-csv\sz%%~nj.csv D:\hengrui\hejiang2000.github.com\tmp\sz-000000.csv sz%%j
        ) else if "%%j" gtr "300000" if "%%j" lss "310000" (
            python convert.py %%i D:\hengrui\hejiang2000.github.com\tmp\sz-csv\sz%%~nj.csv D:\hengrui\hejiang2000.github.com\tmp\sz-300000.csv sz%%j
        )
    )
)

REM rmdir /S /Q D:\hengrui\hejiang2000.github.com\tmp\sz-xls
REM rmdir /S /Q D:\hengrui\hejiang2000.github.com\tmp\sz-buy
REM rmdir /S /Q D:\hengrui\hejiang2000.github.com\tmp\sz-sell
REM mkdir       D:\hengrui\hejiang2000.github.com\tmp\sz-xls
REM mkdir       D:\hengrui\hejiang2000.github.com\tmp\sz-buy
REM mkdir       D:\hengrui\hejiang2000.github.com\tmp\sz-sell

REM start /B cmd /C "C:\Program Files\Microsoft Office\Office15\EXCEL.EXE" D:\hengrui\hejiang2000.github.com\tmp\sz-marker.xlsm
