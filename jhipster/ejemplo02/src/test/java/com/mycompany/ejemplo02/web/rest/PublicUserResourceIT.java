package com.mycompany.ejemplo02.web.rest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.ejemplo02.IntegrationTest;
import com.mycompany.ejemplo02.domain.User;
import com.mycompany.ejemplo02.repository.UserRepository;
import com.mycompany.ejemplo02.security.AuthoritiesConstants;
import java.util.Set;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Integration tests for the {@link PublicUserResource} REST controller.
 */
@AutoConfigureMockMvc
@WithMockUser(authorities = AuthoritiesConstants.ADMIN)
@IntegrationTest
class PublicUserResourceIT {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MockMvc restUserMockMvc;

    private User user;

    @BeforeEach
    void initTest() {
        user = UserResourceIT.initTestUser();
    }

    @AfterEach
    void cleanupAndCheck() {
        userRepository.deleteAll();
    }

    @Test
    void getAllPublicUsers() throws Exception {
        // Initialize the database
        userRepository.save(user);

        // Get all the users
        restUserMockMvc
            .perform(get("/api/users").accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath(String.format("$.[?(@.id == '%s')].login", user.getId())).value(user.getLogin()))
            .andExpect(jsonPath(String.format("$.[?(@.id == '%s')].keys()", user.getId())).value(Set.of("id", "login")))
            .andExpect(jsonPath("$.[*].email").doesNotHaveJsonPath())
            .andExpect(jsonPath("$.[*].imageUrl").doesNotHaveJsonPath())
            .andExpect(jsonPath("$.[*].langKey").doesNotHaveJsonPath());
    }
}
