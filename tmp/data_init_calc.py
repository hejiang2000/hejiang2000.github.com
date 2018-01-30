#!/usr/bin/python3
# -*- coding: UTF-8 -*-
 
import sys, os, pymysql
from stock.TrendMachine import TrendMachine

def get_last_status(db, stock_code):
    sql = "SELECT * FROM stock_trend_1day WHERE stock_code = '%s' ORDER BY trade_date DESC LIMIT 1" % (stock_code)
    cursor = db.cursor()
    cursor.execute(sql)
    return cursor.fetchone() if cursor.rowcount > 0 else (stock_code, '00000000', 0, '', '上升趋势', '上升趋势', 0, 0, 0, 0, 0, 0, 0, 0)
    
def save_calc_status(db, stock_code, trade_date, adjusted_close, status):
    sql = "INSERT INTO stock_trend_1day(stock_code, trade_date, adjusted_close, hint, trend, state, \
    last_up_minor, last_up_nature, last_up_trend, last_down_trend, last_down_nature, last_down_minor, \
    last_up_barrier, last_down_support) VALUES ('%s', '%s', %f, '%s', '%s', '%s', \
    %f, %f, %f, %f, %f, %f, %f, %f)" % (stock_code, trade_date, adjusted_close, *status)
    cursor = db.cursor()
    cursor.execute(sql)
        
def get_uncalc_rows(db, stock_code, trade_date):
    sql = "SELECT * FROM stock_quote_1day WHERE stock_code = '%s' AND trade_date > '%s' ORDER BY trade_date ASC" % (stock_code, trade_date)
    cursor = db.cursor()
    cursor.execute(sql)
    return cursor.fetchall()
    
def do_calculation(db, stock_code):
    status = get_last_status(db, stock_code)
    rows   = get_uncalc_rows(db, stock_code, status[1])
    trend  = TrendMachine(*status[4:])
    for row in rows:
        trade_date     = row[1]
        adjusted_close = row[6]
        status = trend.step(trade_date, adjusted_close)
        save_calc_status(db, stock_code, trade_date, adjusted_close, status)
        
def main(): 
    # 打开数据库连接
    db = pymysql.connect("localhost","root","","stock", charset="utf8")
     
    # 使用cursor()方法获取操作游标 
    cursor = db.cursor()
     
    # SQL 查询语句
    sql = "SELECT DISTINCT stock_code FROM stock_quote_1day"
    
    # 执行SQL语句
    cursor.execute(sql)

    # 获取所有记录列表
    rows = cursor.fetchall()

    for row in rows:
        stock_code = row[0]
        print('calculating %s...' % (stock_code))
        try:
            do_calculation(db, stock_code)
            db.commit()
        except:
            db.rollback()
            print("error - stock_code: %s" % (stock_code))

    # 关闭数据库连接
    db.close()
    
if __name__ == '__main__':
    ret = main()
    sys.exit(ret)
