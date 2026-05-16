package com.mycompany.project_yml.web.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HelloWorldController {

    @RequestMapping("/hello")
    public String hello() {
        String name = "Hello";
        name = name.replace('e', 'x');
        return name;
    }

    @GetMapping("/greet")
    public String greet() {
        return "Greetings from Spring Boot!";
    }
}
