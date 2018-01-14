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
    
    
def main(src_path, dest_path, log_path, code):
    print 'calc - {}'.format(code)

    src_file  = open(src_path , 'rb+')
    dest_file = open(dest_path, 'wb+')
    log_file  = open(log_path , 'ab+')
    
    dest_file.write(('交易日期,开盘价格,最高价格,最低价格,收盘价格,      成交额,      成交量,' + \
    '次级回升,自然回升,上升趋势,下降趋势,自然回撤,次级回撤,' + \
    '关键标记,标记日期,    头寸,    成本,止损比率\r\n').decode('utf-8').encode('gb18030'))
    
    trends = TrendMachine(parse_record_item(src_file.read(32))[4])
    trader = TradeMachine()
    trend_status = ()
    trade_status = ()
    
    while True:
        buf = src_file.read(32)
        if len(buf) < 32:
            stat = trader.get_trade_statistics()
            log_file.write('{},{:>8d},{:>8.4f},{:>8d},{:>8d},{:>8.4f},{:>8d}'.format(code, *stat))
            log_file.write(',{:>8.4f},{:>8d}\r\n'.format(stat[1]+stat[4],stat[2]+stat[5]))
            break
            
        item = parse_record_item(buf)
        
        trends.step(*item)
        trend_status = trends.status()
        
        trader.step(item[4], trend_status[6])
        trade_status = trader.status()
        
        str = '{},{:>8.2f},{:>8.2f},{:>8.2f},{:>8.2f},{:>12.0f},{:>12d}'.format(*item)
        for i in trend_status:
            str = '{},{:>8s}'.format(str, i) if type(i) is types.StringType else '{},{:>8.2f}'.format(str, i)
            
        str = '{},{:>8d},{:>8.2f},{:>8.2f}\r\n'.format(str, *trade_status)
        
        dest_file.write(str.decode('utf-8').encode('gb18030'))
        
    src_file.close()
    dest_file.close()
    
    return trade_status[0]
    
if __name__ == '__main__':
    ret = main(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
    sys.exit(ret)
