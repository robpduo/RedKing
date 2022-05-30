package com.revature.services;

import com.revature.exceptions.InvalidDepositAmount;
import com.revature.exceptions.InvalidEmailOrPasswordException;
import com.revature.exceptions.UserEmailAlreadyExistsException;
import com.revature.models.DepositHelper;
import com.revature.models.User;
import com.revature.models.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class UserService {

    private UserRepo ur;

    @Autowired
    public UserService( UserRepo ur ) {
        this.ur = ur;
    }

    /**
     * Creates a new user entry into the Database
     * @param email     - user's email
     * @param password  - user's password
     * @param firstName - user's first name
     * @param lastName  - user's last name
     * @return User Object
     */
    public User registerUser( String email, String password, String firstName, String lastName, double money ) throws UserEmailAlreadyExistsException {
        if (ur.findByEmailAndPassword(email, password) != null) {
            throw new UserEmailAlreadyExistsException();
        } else {
            User u = new User(email, firstName, lastName, password, money);
            return ur.save(u);
        }
    }

    /**
     * Check user
     * @param email
     * @param password
     * @return user with the same email and password form the DB
     */
    public User loginUser( String email, String password ) throws InvalidEmailOrPasswordException {
        User u = ur.findByEmailAndPassword(email, password);

        if (u == null) {
            throw new InvalidEmailOrPasswordException();
        }

        return u;
    }

    /**
     * Changes the user's account information by account Id
     * @param newUser
     * @return an updated user object
     */
    public User updateUser( User newUser ) {
        return ur.save(newUser);
    }

    /**
     * Determines if the amount to be deposited is valid and adds the amount to the user's total money
     * @param deposit helper object
     * @return an account with an updated money field
     * @throws InvalidDepositAmount
     */
    public User deposit( DepositHelper dh ) throws InvalidDepositAmount {
        //check if deposit amount is greater than 0
        if (dh.getAmount() <= 0) {
            throw new InvalidDepositAmount();
        }
        //get User by id and update deposit amount
        User u = ur.findByUserId(dh.getUserId());

        u.setMoney(u.getMoney() + dh.getAmount());
        return ur.save(u);
    }
}
