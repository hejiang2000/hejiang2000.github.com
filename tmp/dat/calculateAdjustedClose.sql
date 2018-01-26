drop procedure if exists calculateAdjustedClose;  

-- delimiter表示以//结束编译  
delimiter //  

create procedure calculateAdjustedClose()    
begin  
    -- 游标所使用变量需要在定义游标之前申明  
    declare stock_code      char(8);
    declare change_date     char(8);
    declare dividend_per_10 decimal(10,2);
    declare rationed_price  decimal(10,2);
    declare rationed_per_10 decimal(10,2);
    declare split_per_10    decimal(10,2);

    -- 遍历数据结束标志 注意位置顺序  
    DECLARE done INT DEFAULT FALSE;  

    -- 注意用别名 因为id在上面已经有定义所以需要使用表的别名区别  
    declare cur_change CURSOR for select t.stock_code, t.change_date, t.dividend_per_10, t.rationed_price, t.rationed_per_10, t.split_per_10 from stock_change t order by t.stock_code asc, t.change_date asc; 

    -- 将结束标志绑定到游标   
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;  

    -- 初始化 trade_adjusted_close_price
    update stock_quote_1day q set q.trade_adjusted_close_price = q.trade_close_price;
    
    open cur_change;  
    calc: LOOP

        fetch cur_change into stock_code, change_date, dividend_per_10, rationed_price, rationed_per_10, split_per_10;
        
        IF done THEN
            LEAVE calc;
        END IF;
        
        -- 计算 trade_adjusted_close_price
        update stock_quote_1day q set q.trade_adjusted_close_price = (q.trade_adjusted_close_price - dividend_per_10/10 + rationed_price * rationed_per_10/10) / (1 + split_per_10/10 + rationed_per_10/10) where q.stock_code = stock_code and q.trade_date < change_date;

    END LOOP calc;
    
    -- 注意关闭游标  
    close cur_change;    
        
end;  
//  

delimiter ;

call calculateAdjustedClose();
