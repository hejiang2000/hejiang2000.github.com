@echo off

del /F /S /Q D:\hengrui\hejiang2000.github.com\tmp\sh-csv
mkdir        D:\hengrui\hejiang2000.github.com\tmp\sh-csv
del /F /S /Q D:\hengrui\hejiang2000.github.com\tmp\sh-600000-old.csv
ren          D:\hengrui\hejiang2000.github.com\tmp\sh-600000.csv sh-600000-old.csv

echo ��Ʊ����,���׽���,ӯ������,ӯ������,ӯ������,�������,�������,��������,�ۺϱ���,�ۺ����� > D:\hengrui\hejiang2000.github.com\tmp\sh-600000.csv

for /R D:\zd_pazq\vipdoc\sh\lday %%i in (*.day) do (
    for /f "tokens=2 delims=h" %%j in ("%%~ni") do (
        if "%%j" gtr "600000" if "%%j" lss "700000" (
            python convert.py %%i D:\hengrui\hejiang2000.github.com\tmp\sh-csv\sh%%~nj.csv D:\hengrui\hejiang2000.github.com\tmp\sh-600000.csv sh%%j
        )
    )
)

REM rmdir /S /Q D:\hengrui\hejiang2000.github.com\tmp\sh-xls
REM rmdir /S /Q D:\hengrui\hejiang2000.github.com\tmp\sh-buy
REM rmdir /S /Q D:\hengrui\hejiang2000.github.com\tmp\sh-sell
REM mkdir       D:\hengrui\hejiang2000.github.com\tmp\sh-xls
REM mkdir       D:\hengrui\hejiang2000.github.com\tmp\sh-buy
REM mkdir       D:\hengrui\hejiang2000.github.com\tmp\sh-sell

REM start /B cmd /C "C:\Program Files\Microsoft Office\Office15\EXCEL.EXE" D:\hengrui\hejiang2000.github.com\tmp\sh-marker.xlsm
