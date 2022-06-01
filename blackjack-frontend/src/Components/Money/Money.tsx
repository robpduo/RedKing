import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { depositMoney, withdrawMoney } from "../../Slices/UserSlice";
import { AppDispatch, RootState } from "../../Store";

import "./Money.css";

export const Money: React.FC = () => {
    const userState = useSelector((state:RootState) => state.user.user)
    const [money, setMoney] = useState<string>('');

    const dispatch: AppDispatch = useDispatch();
    const navigator = useNavigate();

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMoney(event.target.value);
    };

    const handleSubmit = (event: React.MouseEvent<HTMLInputElement>) => {
        let amount = {
            userId : userState?.userId ? userState.userId : 0,
            amount: parseFloat(money)
        }
        if(userState){
            if(event.currentTarget.id === "addBtn"){
                dispatch(depositMoney(amount));
            } else {
                dispatch(withdrawMoney(amount));
            }
            navigator('/playgame');
        }         
      };
      
    return(
        <div className="moneyHomeScreen">
            <div className="btnContainer">
                
                <div className="inputDiv">
                    <h4 className="inputH4">Money</h4>
                    <input
                        autoComplete="off"
                        className="moneyInput"
                        type="text"
                        name="money"
                        placeholder="Enter amount"
                        onChange={handleInput}
                    />
                </div>
                <div className="twoButtonContainer">
                    <input type="button" className="addBtn" id="addBtn" value="Add" onClick={handleSubmit} />
                    <input type="button" className="WithdrawBtn" id="WithdrawBtn" value="Withdraw" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    )
}