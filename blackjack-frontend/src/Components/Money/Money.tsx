import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { depositMoney } from "../../Slices/UserSlice";
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
        if(userState){
            let amount = {
                userId : userState?.userId ? userState.userId : 0,
                amount: parseFloat(money)
            }
            dispatch(depositMoney(amount));
            navigator('/');
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
                    placeholder="Put your money"
                    onChange={handleInput}
                />
            </div>
            </form>
            <button className="submitBtn" onClick={handleSubmit}>Submit</button>
        </div>
    )
}