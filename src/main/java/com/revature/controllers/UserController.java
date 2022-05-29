package com.revature.controllers;

import com.revature.exceptions.InvalidEmailOrPasswordException;
import com.revature.exceptions.UserEmailAlreadyExistsException;
import com.revature.models.Deck;
import com.revature.models.LoginHelper;
import com.revature.models.User;
import com.revature.repository.UserRepo;
import com.revature.services.DeckService;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {

    private UserService us;

    @Autowired
    public UserController( UserService us ) {
        this.us = us;
    }

    @PostMapping("/register")
    @ResponseBody
    public User handleRegister( @RequestBody User rbUser ) throws UserEmailAlreadyExistsException {
        User u = new User();
        u = us.registerUser(rbUser.getEmail(), rbUser.getPassword(), rbUser.getFirstName(), rbUser.getLastName(), rbUser.getMoney());
        return u;
    }

    @PostMapping("/login")
    @ResponseBody
    public User handleLogin( @RequestBody LoginHelper lh ) throws InvalidEmailOrPasswordException {
        User u = new User();
        u = us.loginUser(lh.getEmail(), lh.getPassword());
        return u;
    }
}
