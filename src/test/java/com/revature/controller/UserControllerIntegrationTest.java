package com.revature.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.BlackJackAppApplication;
import com.revature.models.User;
import com.revature.repository.UserRepo;
import org.assertj.core.api.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = BlackJackAppApplication.class)
@AutoConfigureMockMvc
@AutoConfigureTestDatabase
@ActiveProfiles("test")
public class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepo ur;

    @BeforeEach
    public void resetDatabase() {
        ur.deleteAll();
    }

    private ObjectMapper om = new ObjectMapper();

    @Test
    public void registrationTest() throws Exception {
        User testUser = new User("test@email.com", "test_first", "test_last", "test_password", 8);

        mockMvc.perform(post("/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(testUser))
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(1))
                .andExpect(jsonPath("$.email").value("test@email.com"))
                .andExpect(jsonPath("$.firstName").value("test_first"))
                .andExpect(jsonPath("$.lastName").value("test_last"))
                .andExpect(jsonPath("$.password").value("test_password"))
                .andExpect(jsonPath("$.money").value(8));

        User res = ur.findByEmailAndPassword("test@email.com", "test_password");

        Assertions.assertEquals("test_first", res.getFirstName());
        Assertions.assertEquals("test_last", res.getLastName());
        Assertions.assertEquals("test_password", res.getPassword());
    }

    @Test
    public void loginTest() throws Exception {
        User testUser = new User("test@email.com", "test_first", "test_last", "test_password", 8);

        mockMvc.perform(post("/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(testUser))
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(1))
                .andExpect(jsonPath("$.email").value("test@email.com"))
                .andExpect(jsonPath("$.firstName").value("test_first"))
                .andExpect(jsonPath("$.lastName").value("test_last"))
                .andExpect(jsonPath("$.password").value("test_password"))
                .andExpect(jsonPath("$.money").value(8));

        User res = ur.findByEmailAndPassword("test@email.com", "test_password");

        Assertions.assertEquals("test_first", res.getFirstName());
        Assertions.assertEquals("test_last", res.getLastName());
        Assertions.assertEquals("test_password", res.getPassword());
    }
}
