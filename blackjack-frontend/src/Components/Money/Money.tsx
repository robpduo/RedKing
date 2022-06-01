import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { depositMoney, withdrawMoney } from "../../Slices/UserSlice";
import { AppDispatch, RootState } from "../../Store";



export const Money: React.FC = () => {
    const userState = useSelector((state:RootState) => state.user.user)
    const [money, setMoney] = useState<string>('');

    const dispatch: AppDispatch = useDispatch();
    const navigator = useNavigate();

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMoney(event.target.value);
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        <div>
            <form>
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
            </form>
            <button className="submitBtn" id="addBtn" onClick={handleSubmit}>Add</button>
            <button className="submitBtn" id="withdrawBtn" onClick={handleSubmit}>Withdraw</button>
        </div>
    )
}