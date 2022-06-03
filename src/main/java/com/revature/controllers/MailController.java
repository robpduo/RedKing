package com.revature.controllers;

import com.revature.models.MailHelper;
import com.revature.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MailController {

    @Autowired
    private MailService mailService;

    @PostMapping("/mail")
    public String sendEmail(@RequestBody MailHelper mailHelper) {
        mailService.sendEmail(mailHelper);
        return "mail sent";

    }
}
