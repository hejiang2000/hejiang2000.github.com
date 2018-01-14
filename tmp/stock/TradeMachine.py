#!/usr/bin/python
# -*- coding: UTF-8 -*-

class TradeMachine:
    __loss_ratio__ = 0.09
    __jump_ratio__ = 0.06
    __init_jump_ratio__ = 0.12
    
    def __init__(self):
        self.status_vol  = 0    # 交易量
        self.status_cost = 0.0  # 交易成本
        self.status_bal  = 0.0  # 交易结余
        self.status_stop = 0.0  # 止损价格
        self.status_jump = 0.0  # 更新价格
        
        self.status_trade_days         = 0
        self.status_trade_win_days     = 0
        self.status_trade_win_count    = 0
        self.status_trade_win_ratio    = 0
        self.status_trade_loss_days    = 0
        self.status_trade_loss_count   = 0
        self.status_trade_loss_ratio   = 0
        
    def step(self, val, mark):
        # 增加交易天数
        if self.status_vol > 0:
            self.status_trade_days = self.status_trade_days + 1
            
        # 买入操作
        if self.status_vol == 0 and mark == '买入机会点':
            self.status_vol  = 1
            self.status_cost = val
            self.status_jump = val
            self.status_stop = val * (1 - TradeMachine.__loss_ratio__)
            self.status_trade_days = 0

            return
            
        # 卖出操作
        if self.status_vol > 0 and mark == '卖出机会点':
            if val * self.status_vol - self.status_cost > 0:
                self.status_trade_win_count  = self.status_trade_win_count + 1
                self.status_trade_win_ratio  = self.status_trade_win_ratio + val * self.status_vol / self.status_cost - 1
                self.status_trade_win_days   = self.status_trade_win_days + self.status_trade_days
            else:
                self.status_trade_loss_count = self.status_trade_loss_count + 1
                self.status_trade_loss_ratio = self.status_trade_loss_ratio + val * self.status_vol / self.status_cost - 1
                self.status_trade_loss_days  = self.status_trade_loss_days + self.status_trade_days
                
            self.status_bal  = self.status_bal + (val * self.status_vol - self.status_cost)
            self.status_vol  = 0
            self.status_cost = 0.0
            self.status_jump = 0.0
            self.status_trade_days = 0
            
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
                
            self.status_bal  = self.status_bal + (val * self.status_vol - self.status_cost)
            self.status_vol  = 0
            self.status_cost = 0.0
            self.status_jump = 0.0
            self.status_trade_days = 0

            return
            
        # 更新止损
        jump_ratio = TradeMachine.__jump_ratio__
        if self.status_jump - self.status_cost < 0.0001:
            jump_ratio = TradeMachine.__init_jump_ratio__
        
        if self.status_vol > 0 and val > self.status_jump * (1 + jump_ratio):
            self.status_jump = val
            self.status_stop = val * (1 - TradeMachine.__loss_ratio__)
            
    def status(self):
        return (self.status_vol, self.status_cost, self.status_bal)
        
    def get_trade_statistics(self):
        return (self.status_trade_win_count, self.status_trade_win_ratio, self.status_trade_win_days, self.status_trade_loss_count, self.status_trade_loss_ratio, self.status_trade_loss_days)
        