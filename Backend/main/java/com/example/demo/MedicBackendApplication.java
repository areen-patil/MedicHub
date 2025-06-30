package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@EnableMethodSecurity // for Spring Boot 3.x+
@SpringBootApplication
public class MedicBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(MedicBackendApplication.class, args);
	}

}
