@echo off

echo.
echo =====================================
echo 从通信达系统读取交易数据，并保存为CSV
echo =====================================
echo.

echo -- 股票代码,交易日期,开盘价格,最高价格,最低价格,收盘价格,      成交额,      成交量> data_init_extract.sql
rem echo 股票代码,交易日期,开盘价格,最高价格,最低价格,收盘价格,      成交额,      成交量 > data_init_extract.csv

rem 设置已提取日期码
for /f %%i in (data_init_extract.date) do set data_init_extract=%%i

echo %data_init_extract%


for /R D:\zd_pazq\vipdoc\sh\lday %%i in (*.day) do (
    for /f "tokens=2 delims=h" %%j in ("%%~ni") do (
        if "%%j" gtr "600000" if "%%j" lss "700000" (
            python data_init_extract.py %%i data_init_extract.sql sh%%j %data_init_extract%
        )
    )
)

for /R D:\zd_pazq\vipdoc\sz\lday %%i in (*.day) do (
    for /f "tokens=2 delims=z" %%j in ("%%~ni") do (
        if "%%j" lss "010000" (
            python data_init_extract.py %%i data_init_extract.sql sz%%j %data_init_extract%
        ) else if "%%j" gtr "300000" if "%%j" lss "310000" (
            python data_init_extract.py %%i data_init_extract.sql sz%%j %data_init_extract%
        )
    )
)


for /f "usebackq tokens=1" %%i in (`date /t`) do set data_init_extract=%%i
for /f "delims=/ tokens=1,2,3" %%i in ("%data_init_extract%") do echo %%i%%j%%k> data_init_extract.date
