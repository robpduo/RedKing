package com.revature.services;

import com.revature.models.MailHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(MailHelper mailHelper) {
        // use mailSender here...
        String from = "zamanuap140182@gmail.com";
        String to = mailHelper.getEmail();

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try{

            helper.setFrom(from);
            helper.setTo(to);
            boolean html = true;
            String text ="";
            if(mailHelper.getMsgType().equals("Register")){
                helper.setSubject("Registration for BackJack confirmed");
                text = "<b>Hello " + mailHelper.getFirstName() +",</b><br><i>You've registered for BackJack.</i>";
            } else {
                helper.setSubject("Congratulation for winning BackJack!!!!!!");
                text = "<b>Congratulation " + mailHelper.getFirstName() +" !!!</b><br><i>You won BackJack.</i>";
            }

            helper.setText(text, html);
            mailSender.send(message);

        } catch (Exception e){
                System.out.println(e.getMessage());
        }
    }
}
