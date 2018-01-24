#!/usr/bin/python
# -*- coding: UTF-8 -*-

import sys, struct, types
from stock.TrendMachine import TrendMachine
from stock.TradeMachine import TradeMachine

def parse_record_item(buf):
    _date, _open, _high, _low, _close, _amount, _vol, _reserved = struct.unpack('iiiiifii', buf)
    
    _open  = float(_open ) * 0.01
    _high  = float(_high ) * 0.01
    _low   = float(_low  ) * 0.01
    _close = float(_close) * 0.01

    return (_date, _open, _high, _low, _close, _amount, _vol)
    
    
def main(src_path, dest_path, stockcode, datecode):
    print 'calc - {}'.format(stockcode)

    src_file  = open(src_path , 'rb+')
    dest_file = open(dest_path, 'ab+')
    
    datecode  = int(datecode)
    while True:
        buf = src_file.read(32)
        if len(buf) < 32:
            break
            
        item = parse_record_item(buf)
        if item[0] > datecode:
            str = 'insert into data_1day(stock_code, trade_date, trade_open_price, trade_high_price, trade_low_price, trade_close_price, trade_value, trade_volume) values(\'{}\',\'{}\',{:>8.2f},{:>8.2f},{:>8.2f},{:>8.2f},{:>12.0f},{:>12d});\r\n'.format(stockcode, *item)
            dest_file.write(str)
            # str = '{},{},{:>8.2f},{:>8.2f},{:>8.2f},{:>8.2f},{:>12.0f},{:>12d}\r\n'.format(stockcode, *item)
            # dest_file.write(str.decode('utf-8').encode('gb18030'))
        
    src_file.close()
    dest_file.close()
    
if __name__ == '__main__':
    ret = main(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
    sys.exit(ret)
