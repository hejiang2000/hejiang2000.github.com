#!/usr/bin/python
# -*- coding: UTF-8 -*-

class TrendMachine:
    __turn_ratio__ = 0.06
    __keep_ratio__ = 0.03

    def __init__(self, val):
        self.last_up_minor_val     = val
        self.last_up_nature_val    = val
        self.last_up_trend_val     = val

        self.last_down_trend_val   = val
        self.last_down_nature_val  = val
        self.last_down_minor_val   = val
        
        self.last_up_minor_row     = ''
        self.last_up_nature_row    = ''
        self.last_up_trend_row     = ''

        self.last_down_trend_row   = ''
        self.last_down_nature_row  = ''
        self.last_down_minor_row   = ''

        self.state                 = '上升趋势'
        self.trend                 = '上升趋势'
        
        self.last_up_barrier_val   = val
        self.last_down_support_val = val

        self.status_up_minor       = ''
        self.status_up_nature      = ''
        self.status_up_trend       = ''
        self.status_down_trend     = ''
        self.status_down_nature    = ''
        self.status_down_minor     = ''
        self.status_mark_action    = ''
        self.status_mark_date      = ''

        
    def step(self, trade_date, trade_open, trade_high, trade_low, trade_close, trade_amount, trade_volume):
        self.__update_status__("", "", "", "", "", "")
        self.status_mark_action    = ""
        self.status_mark_date      = ""
        
        if self.state == "次级回升":
            self.__step_up_minor__(trade_date, trade_close, False)

        if self.state == "自然回升":
            self.__step_up_nature__(trade_date, trade_close, False)
            
        if self.state == "上升趋势":
            self.__step_up_trend__(trade_date, trade_close, False)
            
        if self.state == "下降趋势":
            self.__step_down_trend__(trade_date, trade_close, False)
            
        if self.state == "自然回撤":
            self.__step_down_nature__(trade_date, trade_close, False)
            
        if self.state == "次级回撤":
            self.__step_down_minor__(trade_date, trade_close, False)
        
        
    def status(self):
        return (self.status_up_minor, self.status_up_nature, self.status_up_trend, 
        self.status_down_trend, self.status_down_nature, self.status_down_minor, 
        self.status_mark_action, self.status_mark_date)
        
    def getBarrierValue(self):
        return self.last_up_barrier_val
        
    def getSupportValue(self):
        return self.last_down_support_val
        
    def __mark__(self, status_mark_action, status_mark_date):
        if self.status_mark_action == '':
            self.status_mark_action = status_mark_action 
            self.status_mark_date   = '{}'.format(status_mark_date)

    def __update_status__(self, status_up_minor, status_up_nature, status_up_trend, status_down_trend, status_down_nature, status_down_minor):
        self.status_up_minor    = status_up_minor
        self.status_up_nature   = status_up_nature
        self.status_up_trend    = status_up_trend
        
        self.status_down_trend  = status_down_trend
        self.status_down_nature = status_down_nature
        self.status_down_minor  = status_down_minor
        
    def __round__(self, value):
        return round(value, 2)
        
        
    # 上升趋势
    def __step_up_trend__(self, row, val, transfer):
        # 保持上升趋势
        if val >= self.last_up_trend_val or transfer:
            # 更新状态值
            self.__update_status__("", "", val, "", "", "")
            
            # 记录数值和位置
            self.last_up_trend_val = val
            self.last_up_trend_row = row
            
            return
        
        # 自然回撤
        if val <= self.__round__(self.last_up_trend_val * (1 - TrendMachine.__turn_ratio__)):
            # 标记顶点
            self.__mark__("上升顶点", self.last_up_trend_row)
            
            # 转换状态
            self.state = "自然回撤"
            self.__step_down_nature__(row, val, True)
            
            return

    # 自然回升
    def __step_up_nature__(self, row, val, transfer):
        # 跳转上升趋势
        if val >= self.__round__(self.last_up_barrier_val * (1 + TrendMachine.__keep_ratio__)) and (self.trend <> "上升趋势" or val >= self.last_up_trend_val):
            # 转换状态
            self.state = "上升趋势"
            self.trend = self.state
            self.__step_up_trend__(row, val, True)
            
            return
        
        # 继续自然回升
        if val >= self.last_up_nature_val or transfer:
            # 更新状态值
            self.__update_status__("", val, "", "", "", "")
            
            # 记录数值和位置
            self.last_up_nature_val = val
            self.last_up_nature_row = row
            
            return
        
        # 标记卖出机会
        if self.trend == "上升趋势" and self.last_up_nature_val < self.last_up_trend_val and self.last_up_nature_val > self.last_up_trend_val * (1 - TrendMachine.__turn_ratio__) and val < self.last_up_nature_val * (1 - TrendMachine.__keep_ratio__):
            self.__mark__("卖出机会", "")
        
        # 跳转自然回撤
        if val <= self.__round__(self.last_up_nature_val * (1 - TrendMachine.__turn_ratio__)):
            # 标记顶点
            self.__mark__("回升顶点", self.last_up_nature_row)
            
            # 记录数值和位置
            self.last_up_barrier_val = self.last_up_nature_val
            self.last_up_barrier_row = self.last_up_nature_row
            
            # 转换状态
            #if val <= self.last_down_nature_val:
                # 自然回撤
            self.state = "自然回撤"
            self.__step_down_nature__(row, val, True)
            #else:
                # 次级回撤
            #    self.state = "次级回撤"
            #    __step_down_minor(row, val, True)
            
            return

            
    # 下降趋势
    def __step_down_trend__(self, row, val, transfer):
        # 保持下降趋势
        if val <= self.last_down_trend_val or transfer:
            # 更新状态值
            self.__update_status__("", "", "", val, "", "")
            
            # 记录数值和位置
            self.last_down_trend_val = val
            self.last_down_trend_row = row
            
            return
        
        # 自然回升
        if val >= self.__round__(self.last_down_trend_val * (1 + TrendMachine.__turn_ratio__)):
        
            # 标记顶点
            self.__mark__("下降顶点", self.last_down_trend_row)
            
            # 转换状态
            self.state = "自然回升"
            self.__step_up_nature__(row, val, True)
            
            return

            
    # 自然回撤
    def __step_down_nature__(self, row, val, transfer):
        # 跳转下降趋势
        if val <= self.__round__(self.last_down_support_val * (1 - TrendMachine.__keep_ratio__)) and (self.trend <> "下降趋势" or val <= self.last_down_trend_val):
            # 转换状态
            self.state = "下降趋势"
            self.trend = self.state
            self.__step_down_trend__(row, val, True)
            
            return
        
        # 继续自然回撤
        if val <= self.last_down_nature_val or transfer:
            # 更新状态值
            self.__update_status__("", "", "", "", val, "")
            
            # 记录数值和位置
            self.last_down_nature_val = val
            self.last_down_nature_row = row
            
            return
        
        # 标记买入机会
        if self.trend == "下降趋势" and self.last_down_nature_val > self.last_down_trend_val and self.last_down_nature_val < self.last_down_trend_val * (1 + TrendMachine.__keep_ratio__) and val > self.last_down_nature_val * (1 + TrendMachine.__keep_ratio__):
            self.__mark__("买入机会", "")
        
        # 跳转自然回升
        if val >= self.__round__(self.last_down_nature_val * (1 + TrendMachine.__turn_ratio__)):
            # 标记顶点
            self.__mark__("回撤顶点", self.last_down_nature_row)
            
            # 记录数值和位置
            self.last_down_support_val = self.last_down_nature_val
            self.last_down_support_row = self.last_down_nature_row
            
            # 转换状态
            #if val >= self.last_up_nature_val:
                # 自然回升
            self.state = "自然回升"
            self.__step_up_nature__(row, val, True)
            #else:
                # 次级回升
            #    self.state = "次级回升"
            #    __step_up_minor(row, val, True)
            
            return
        

    # 次级回升
    def __step_up_minor__(self, row, val, transfer):
        # 跳转自然回升
        if val >= self.last_up_nature_val:
            # 转换状态
            self.state = "自然回升"
            self.__step_up_nature__(row, val, True)
            
            return
        
        # 继续次级回升
        if val >= self.last_up_minor_val or transfer:
            # 更新状态值
            self.__update_status__(val, "", "", "", "", "")
            
            # 记录数值和位置
            self.last_up_minor_val = val
            
            return
        
        # 跳转自然回撤
        if val <= self.__round__(self.last_up_minor_val * (1 + TrendMachine.__turn_ratio__)):
            # 转换状态
            if val <= self.last_down_nature_val:
                # 自然回撤
                self.state = "自然回撤"
                self.__step_down_nature__(row, val, True)
            else:
                # 次级回撤
                self.state = "次级回撤"
                self.__step_down_minor__(row, val, True)
            
            return

            
    # 次级回撤
    def __step_down_minor__(self, row, val, transfer):
        # 跳转自然回撤
        if val <= self.last_down_nature_val:
            # 转换状态
            self.state = "自然回撤"
            self.__step_down_nature__(row, val, True)
            
            return
        
        # 继续次级回撤
        if val <= self.last_down_minor_val or transfer:
            # 更新状态值
            self.__update_status__("", "", "", "", "", val)
            
            # 记录数值和位置
            self.last_down_minor_val = val
            
            return
        
        
        # 跳转自然回升
        if val >= self.__round__(self.last_down_minor_val * (1 + TrendMachine.__turn_ratio__)):
            # 转换状态
            if val >= self.last_up_nature_val:
                # 自然回升
                self.state = "自然回升"
                self.__step_up_nature__(row, val, True)
            else:
                # 次级回升
                self.state = "次级回升"
                self.__step_up_minor__(row, val, True)
            
            return
