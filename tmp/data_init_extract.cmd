@echo off

echo.
echo =====================================
echo ��ͨ�Ŵ�ϵͳ��ȡ�������ݣ�������ΪCSV
echo =====================================
echo.

echo -- ��Ʊ����,��������,���̼۸�,��߼۸�,��ͼ۸�,���̼۸�,      �ɽ���,      �ɽ���> data_init_extract.sql
rem echo ��Ʊ����,��������,���̼۸�,��߼۸�,��ͼ۸�,���̼۸�,      �ɽ���,      �ɽ��� > data_init_extract.csv

rem ��������ȡ������
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
