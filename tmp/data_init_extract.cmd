@echo off

echo.
echo =====================================
echo 从通信达系统读取交易数据，并保存为CSV
echo =====================================
echo.

rem 设置已提取日期码
set data_init_extract=0
for /f %%i in (data_init_extract.date) do set data_init_extract=%%i

echo %data_init_extract%
del /f /q data_init_extract.sql

python data_init_extract.py D:\zd_pazq\vipdoc\sh\lday data_init_extract.sql %data_init_extract%
python data_init_extract.py D:\zd_pazq\vipdoc\sz\lday data_init_extract.sql %data_init_extract%

for /f "usebackq tokens=1" %%i in (`date /t`) do set data_init_extract=%%i
for /f "delims=/ tokens=1,2,3" %%i in ("%data_init_extract%") do echo %%i%%j%%k> data_init_extract.date
