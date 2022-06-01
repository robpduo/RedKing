import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../../Interfaces/IUser';
import { retrieveUserScores } from '../../Slices/UserSlice';
import { AppDispatch, RootState } from '../../Store';
import ScoreRows from './ScoreRows';

const HighScore: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(retrieveUserScores());
    console.log(userState.users);
    console.log("X");
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Score</th>
        </tr>
      </thead>

      {userState.users?.map((user: IUser) => {
        return <ScoreRows {...user} key={user.userId} />
      })}

    </table>
  )
}

export default HighScore