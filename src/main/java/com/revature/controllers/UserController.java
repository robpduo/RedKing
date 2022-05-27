package com.revature.controllers;

import com.revature.models.Deck;
import com.revature.models.LoginHelper;
import com.revature.models.User;
import com.revature.repository.UserRepo;
import com.revature.services.DeckService;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/user")
public class UserController {

    private UserService us;

    @Autowired
    public UserController( UserService us ) {
        this.us = us;
    }

    @PostMapping("/register")
    @ResponseBody
    public User handleRegister( @RequestBody User u ) {
        return us.registerUser(u.getEmail(), u.getPassword(), u.getFirstName(), u.getLastName(), u.getMoney());
    }

    @PostMapping("/login")
    @ResponseBody
    public User handleLogin( @RequestBody LoginHelper u ) {
       return us.loginUser(u.getEmail(), u.getPassword());
    }
}
