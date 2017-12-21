#!/usr/bin/python
#coding=utf-8

import sys, struct

def main(src_path, dest_path):
    print 'src: ', src_path
    print 'dest:', dest_path
    
    src_file = open(src_path, 'rb+')
    dest_file = open(dest_path, 'wb+')
    
    dest_file.write('日期,开盘,最高,最低,收盘,成交额,成交量\r\n'.decode('utf-8').encode('gb18030'))
    while True:
        buf = src_file.read(32)
        if len(buf) < 32:
            break
            
        _date, _open, _high, _low, _close, _amount, _vol, _reserved = struct.unpack('iiiiifii', buf)
        
        _open  = float(_open ) * 0.01
        _high  = float(_high ) * 0.01
        _low   = float(_low  ) * 0.01
        _close = float(_close) * 0.01
        
        str = '{},{:.2f},{:.2f},{:.2f},{:.2f},{:.2f},{}\r\n'.format(_date, _open, _high, _low, _close, _amount, _vol)
        dest_file.write(str)
        
    src_file.close()
    dest_file.close()
    
    print 'done'
    
if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
    