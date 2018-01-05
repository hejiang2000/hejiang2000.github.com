#!/usr/bin/python
#coding=utf-8

import sys, struct

def main(src_path, dest_path):
    print 'src: ', src_path
    print 'dest:', dest_path
    
    src_file = open(src_path, 'rb+')
    dest_file = open(dest_path, 'wb+')

    # decode file header
    _unknown, = struct.unpack('h', src_file.read(2))
    _date, _index_record_count, _index_record_len, _data_record_len, = struct.unpack('iihh', src_file.read(12))
    
    # reserved bytes
    src_file.read(6)
    
    dest_file.write('{},{},{},{},{}\r\n'.format(_unknown, _date, _index_record_count, _index_record_len, _data_record_len))
    
    # decode index table
    for i in range(_index_record_count):
        _code, = struct.unpack('6s', src_file.read(6))
        _zero, = struct.unpack('b', src_file.read(1))
        _offset, = struct.unpack('I', src_file.read(4))
        
        dest_file.write('{},0x{:0>8x}\r\n'.format(_code, _offset))
        
    # decode finance data records
    decode_metrics(src_file, dest_file)
    
    src_file.close()
    dest_file.close()
    
    print 'done'
    
def decode_metrics(src_file, dest_file):
    src_file.seek(0x00016831L)
    for i in range(1104/4):
        v, = struct.unpack('f', src_file.read(4))
        print "{:.2f}".format(v)
        
if __name__ == '__main__':
    main('gpcw20170930.dat', 'gwcw.txt')
    