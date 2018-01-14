#!/usr/bin/python
# -*- coding: UTF-8 -*-

import sys, struct
from stock.TrendMachine import TrendMachine
from stock.TradeMachine import TradeMachine

def parse_record_item(buf):
    _date, _open, _high, _low, _close, _amount, _vol, _reserved = struct.unpack('iiiiifii', buf)
    
    _open  = float(_open ) * 0.01
    _high  = float(_high ) * 0.01
    _low   = float(_low  ) * 0.01
    _close = float(_close) * 0.01

    return (_date, _open, _high, _low, _close, _amount, _vol)
    
    
def main(src_path, dest_path, log_path, code):
    print 'calc - {}'.format(code)

    src_file  = open(src_path , 'rb+')
    dest_file = open(dest_path, 'wb+')
    log_file  = open(log_path , 'ab+')
    
    dest_file.write('日期,开盘,最高,最低,收盘,成交额,成交量,次级回升,自然回升,上升趋势,下降趋势,自然回撤,次级回撤,关键标记,标记日期, 头寸, 成本, 结余\r\n'.decode('utf-8').encode('gb18030'))
    log_file.write('股票代码,结余,盈利,亏损\r\n')
    
    tm  = TrendMachine(parse_record_item(src_file.read(32))[4])
    trader = TradeMachine()
    trade_status = ()
    
    while True:
        buf = src_file.read(32)
        if len(buf) < 32:
            log_file.write('{}, {},{},{}\r\n'.format(code, trade_status[2], 1 if trade_status[2] > 0 else 0, 1 if trade_status[2] < 0 else 0))
            break
            
        item = parse_record_item(buf)
        tm.step(*item)
        trend_status = tm.status()
        trader.step(item[4], trend_status[6])
        trade_status = trader.status()
        
        str = '{},{:>8.2f},{:>8.2f},{:>8.2f},{:>8.2f},{:>8.2f},{}'.format(*item)
        str = '{},{},{},{},{},{},{},{},{}'.format(str, *trend_status)
        str = '{},{},{},{}\r\n'.format(str, *trade_status)
        
        dest_file.write(str.decode('utf-8').encode('gb18030'))
        
    src_file.close()
    dest_file.close()
    
if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
    
