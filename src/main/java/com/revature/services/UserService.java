package com.revature.services;

import com.revature.exceptions.InvalidEmailOrPasswordException;
import com.revature.exceptions.UserEmailAlreadyExistsException;
import com.revature.models.User;
import com.revature.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletResponse;
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
     * @return
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
     * @return
     */
    public User updateUser( User newUser ) {
        return ur.save(newUser);
    }
}
