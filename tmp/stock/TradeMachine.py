#!/usr/bin/python
# -*- coding: UTF-8 -*-

class TradeMachine:
    __loss_ratio__ = 0.09
    __jump_ratio__ = 0.03
    __init_jump_ratio__ = 0.12
    
    def __init__(self):
        self.status_vol  = 0    # 交易量
        self.status_cost = 0.0  # 交易成本
        self.status_stop = 0.0  # 止损价格
        self.status_jump = 0.0  # 更新价格
        
        self.status_trade_days         = 0
        self.status_trade_win_days     = 0
        self.status_trade_win_count    = 0
        self.status_trade_win_ratio    = 0
        self.status_trade_loss_days    = 0
        self.status_trade_loss_count   = 0
        self.status_trade_loss_ratio   = 0
        
        self.status_loss_ratio         = TradeMachine.__loss_ratio__

    def step(self, val, mark):
        # 增加交易天数
        if self.status_vol > 0:
            self.status_trade_days = self.status_trade_days + 1
            
        # 买入操作
        if self.status_vol == 0 and mark == '买入机会':
            self.status_vol  = 1
            self.status_cost = val
            self.status_jump = val
            self.status_stop = val * (1 - TradeMachine.__loss_ratio__)
            self.status_trade_days = 0
            self.status_loss_ratio = TradeMachine.__loss_ratio__

            return
            
        # 卖出操作
        if self.status_vol > 0 and mark == '卖出机会':
            if val * self.status_vol - self.status_cost > 0:
                self.status_trade_win_count  = self.status_trade_win_count + 1
                self.status_trade_win_ratio  = self.status_trade_win_ratio + val * self.status_vol / self.status_cost - 1
                self.status_trade_win_days   = self.status_trade_win_days + self.status_trade_days
            else:
                self.status_trade_loss_count = self.status_trade_loss_count + 1
                self.status_trade_loss_ratio = self.status_trade_loss_ratio + val * self.status_vol / self.status_cost - 1
                self.status_trade_loss_days  = self.status_trade_loss_days + self.status_trade_days
                
            self.status_vol  = 0
            self.status_cost = 0.0
            self.status_jump = 0.0
            self.status_trade_days = 0
            self.status_loss_ratio = TradeMachine.__loss_ratio__
           
            return
            
        # 止损操作
        if self.status_vol > 0 and val < self.status_stop:
            if val * self.status_vol - self.status_cost > 0:
                self.status_trade_win_count  = self.status_trade_win_count + 1
                self.status_trade_win_ratio  = self.status_trade_win_ratio + val * self.status_vol / self.status_cost - 1
                self.status_trade_win_days   = self.status_trade_win_days + self.status_trade_days
            else:
                self.status_trade_loss_count = self.status_trade_loss_count + 1
                self.status_trade_loss_ratio = self.status_trade_loss_ratio + val * self.status_vol / self.status_cost - 1
                self.status_trade_loss_days  = self.status_trade_loss_days + self.status_trade_days
                
            self.status_vol  = 0
            self.status_cost = 0.0
            self.status_jump = 0.0
            self.status_trade_days = 0
            self.status_loss_ratio = TradeMachine.__loss_ratio__

            return
            
        # 更新止损
        jump_ratio = TradeMachine.__jump_ratio__
        if self.status_jump - self.status_cost < 0.0001:
            jump_ratio = TradeMachine.__init_jump_ratio__
        
        if self.status_vol > 0 and val > self.status_jump * (1 + jump_ratio):
            if self.status_loss_ratio < TradeMachine.__loss_ratio__ * 2:
                self.status_loss_ratio = self.status_loss_ratio + 0.01
                
            self.status_jump = val
            self.status_stop = val * (1 - self.status_loss_ratio)
            
    def status(self):
        return (self.status_vol, self.status_cost, self.status_loss_ratio)
        
    def get_trade_statistics(self):
        return (self.status_trade_win_count, self.status_trade_win_ratio, self.status_trade_win_days, \
        self.status_trade_loss_count, self.status_trade_loss_ratio, self.status_trade_loss_days)
        