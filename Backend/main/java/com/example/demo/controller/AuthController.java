package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.security.JwtUtil;
import com.example.demo.service.UserService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // Standard email/password login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("LOGIN REQUEST:: " + loginRequest.getEmail());
        User user = userService.findByEmail(loginRequest.getEmail());
        System.out.println("USER FOUND:: " + (user != null));
        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
            System.out.println("TOKEN GENERATED:: " + token);
            return ResponseEntity.ok(new JwtResponse(token, user.getRole(), user.getEmail()));
        } else {
            return ResponseEntity.status(401).body("INVALID email or password");
        }
    }



    // DTO for login request
    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    // DTO for JWT response
    public static class JwtResponse {
        private String token;
        private String role;
        private String email;

        public JwtResponse(String token, String role, String email) {
            this.token = token;
            this.role = role;
            this.email = email;
        }
        public String getToken() { return token; }
        public String getRole() { return role; }
        public String getEmail() { return email; }
    }

    // DTO for Google login request
    public static class GoogleLoginRequest {
        private String idToken;

        public String getIdToken() { return idToken; }
        public void setIdToken(String idToken) { this.idToken = idToken; }
    }

    @PostMapping("/google")
public ResponseEntity<?> googleLogin(@RequestBody GoogleLoginRequest request) {
    String idTokenString = request.getIdToken();
    GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier
            .Builder(new NetHttpTransport(), new GsonFactory())
            .setAudience(Collections.singletonList("YOUR_GOOGLE_CLIENT_ID")) // Replace with your client ID
            .build();
    try {
        GoogleIdToken idToken = verifier.verify(idTokenString);
        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            // Find or create user
            User user = userService.findByEmail(email);
            if (user == null) {
                user = new User();
                user.setEmail(email);
                user.setRole("ROLE_USER"); // or assign based on your logic
                userService.saveUser(user);
            }
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
            return ResponseEntity.ok(new JwtResponse(token, user.getRole(), user.getEmail()));
        } else {
            return ResponseEntity.status(401).body("Invalid Google ID token");
        }
    } catch (Exception e) {
        return ResponseEntity.status(401).body("Google authentication failed");
    }
}
}