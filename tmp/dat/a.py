#coding=utf-8

import pandas as pd
import numpy as np
import math
from sklearn.svm import SVR  
from sklearn.model_selection import GridSearchCV  
from sklearn.model_selection import learning_curve
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
import jqdata

def initialize(context):
    set_params()
    set_backtest()
    run_daily(daily_runner, 'every_bar')
    
def set_params():
    g.days = 0
    g.trade_interval = 1
    g.stocknum = 1
    g.index = '000985.XSHG'
    g.industry_set = ['801010', '801020', '801030', '801040', '801050', '801080', '801110', '801120', '801130', 
        '801140', '801150', '801160', '801170', '801180', '801200', '801210', '801230', '801710',
        '801720', '801730', '801740', '801750', '801760', '801770', '801780', '801790', '801880','801890']
    
def set_backtest():
    set_benchmark(g.index)
    set_option('use_real_price', True)
    log.set_level('order', 'error')
    
def daily_runner(context):
    if g.days % g.trade_interval == 0:
        trade(context)
        
    g.days += 1
    
def trade(context):
    sample = get_index_stocks(g.index, date = None)
    q = query(valuation.code, valuation.market_cap, balance.total_assets - balance.total_liability,
        balance.total_assets / balance.total_liability, income.net_profit, income.net_profit + 1, 
        indicator.inc_revenue_year_on_year, balance.development_expenditure).filter(valuation.code.in_(sample))
    df = get_fundamentals(q, date = None)
    df.columns = ['code', 'log_mcap', 'log_NC', 'LEV', 'NI_p', 'NI_n', 'g', 'log_RD']
    
    df['log_mcap'] = np.log(df['log_mcap'])
    df['log_NC'] = np.log(df['log_NC'])
    df['NI_p'] = np.log(np.abs(df['NI_p']))
    df['NI_n'] = np.log(np.abs(df['NI_n'][df['NI_n']<0]))
    df['log_RD'] = np.log(df['log_RD'])
    df.index = df.code.values
    del df['code']
    df = df.fillna(0)
    df[df>10000] = 10000
    df[df<-10000] = -10000
    
    for i in range(len(g.industry_set)):
        industry = get_industry_stocks(g.industry_set[i], date = None)
        s = pd.Series([0]*len(df), index=df.index)
        s[set(industry) & set(df.index)]=1
        df[g.industry_set[i]] = s
        
    X = df[['log_NC', 'LEV', 'NI_p', 'NI_n', 'g', 'log_RD'] + g.industry_set]
    Y = df[['log_mcap']]
    X = X.fillna(0)
    Y = Y.fillna(0)
    
    svr = SVR(kernel='rbf', gamma=0.1) 
    model = svr.fit(X, Y)
    factor = Y - pd.DataFrame(svr.predict(X), index = Y.index, columns = ['log_mcap'])
    factor = factor.sort_index(by = 'log_mcap')
    stockset = list(factor.index[:g.stocknum])
    sell_list = list(context.portfolio.positions.keys())
    for stock in sell_list:
        if stock not in stockset:
            stock_sell = stock
            order_target_value(stock_sell, 0)
        
    if len(context.portfolio.positions) >= g.stocknum:
        return
    
    num = g.stocknum - len(context.portfolio.positions)
    cash = context.portfolio.cash/num
    for stock in stockset:
        if stock not in sell_list:
            stock_buy = stock
            order_target_value(stock_buy, cash)
            num = num - 1
            if num == 0:
                break
