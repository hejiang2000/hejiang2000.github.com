#!/usr/bin/python
# -*- coding: UTF-8 -*-

import sys, os, struct, pymysql

# 解析二进制数据记录
def parse_record_item(buf):
    _date, _open, _high, _low, _close, _amount, _vol, _reserved = struct.unpack('iiiiifii', buf)
    
    _open  = float(_open ) * 0.01
    _high  = float(_high ) * 0.01
    _low   = float(_low  ) * 0.01
    _close = float(_close) * 0.01

    return (_date, _open, _high, _low, _close, _amount, _vol)
    
# 从文件中提取新数据，并插入数据库中    
def extract(src_file, dst_file, stock_code, date_code):
    date_code = int(date_code)
    while True:
        buf = src_file.read(32)
        if len(buf) < 32:
            break
            
        item = parse_record_item(buf)
        if item[0] > date_code:
            sql = "insert into stock_quote_1day(stock_code, trade_adjusted_close_price, \
            trade_date, trade_open_price, trade_high_price, trade_low_price, trade_close_price, trade_value, trade_volume) \
            values('{}',{:>8.2f}, '{}',{:>8.2f},{:>8.2f},{:>8.2f},{:>8.2f},{:>16.2f},{:>14.0f});\n".format(stock_code, item[4], *item)
            dst_file.write(sql)

        
# 主程序入口
def main(folder_path, sql_path, date_code, min_scode, max_scode):
    print('folder: {}'.format(folder_path))
    print('  date: {}'.format(date_code))
    
    dst_file = open(sql_path, 'a+')

    # 循环处理目录下的每个文件
    for file_path in os.listdir(folder_path):
        stock_code = file_path[2:8]
        if stock_code > min_scode and stock_code < max_scode:            
            print('extracting {}\\{}'.format(folder_path, file_path))
            src_file = open(folder_path + '\\' + file_path, 'rb+')
            extract(src_file, dst_file, stock_code, date_code)
            src_file.close()
            return 
            
    return 0
    
if __name__ == '__main__':
    folder_path = sys.argv[1]
    sql_path    = sys.argv[2]
    date_code   = sys.argv[3]
    min_scode   = sys.argv[4]
    max_scode   = sys.argv[5]
    
    ret = main(folder_path, sql_path, date_code, min_scode, max_scode)
    sys.exit(ret)
