#!/usr/bin/python
#coding=utf-8

import sys, struct

def main(src_path, dest_path):
    print 'src: ', src_path
    print 'dest:', dest_path
    
    # open files
    src_file = open(src_path, 'rb+')
    dest_file = open(dest_path, 'wb+')

    # decode file header
    _date, _index_record_count, _index_record_len, _metrics_record_len, = decode_header(src_file)
    print "date: {}, stock_count: {}, metrics_record_len: {}".format(_date, _index_record_count, _metrics_record_len)
    
    # decode index table
    _index_table = [];
    for i in range(_index_record_count):
        _index_table.append(decode_index(src_file));
        
    # decode financial metrics records
    for key, value in _index_table:
        metrics = decode_metrics(key, value, src_file, _metrics_record_len)
        dest_file.write('{}: {}\r\n'.format(key, metrics))

    # close files
    src_file.close()
    dest_file.close()
    
    print 'done'

def decode_header(src_file):
    # flag 0x0001
    src_file.read(2)

    # decode file header
    header = struct.unpack('iihh', src_file.read(12))
    
    # reserved 0x000000000000
    src_file.read(6)
    
    return header
    
def decode_index(src_file):
    _code, = struct.unpack('6s', src_file.read(6))
    _zero, = struct.unpack('b', src_file.read(1))
    _offset, = struct.unpack('I', src_file.read(4))
    
    return (_code, _offset)

def decode_metrics(code, offset, src_file, record_len):
    src_file.seek(offset)
    
    metrics = []
    for i in range(record_len / 4):
        metrics.append(struct.unpack('f', src_file.read(4))[0])
        
    return metrics
    
if __name__ == '__main__':
    main('gpcw20170930.dat', 'gwcw.txt')
    