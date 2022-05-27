package com.revature.controllers;

import com.revature.models.User;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
        User ;
        return u;
    }
}
