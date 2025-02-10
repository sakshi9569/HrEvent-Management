package com.Hr_event_Management.hr_event_management.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "YourSuperSecretKeyWithAtLeast256BitsLength!";
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours
    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    // Method to generate a JWT token

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)  // The user info (usually username or user id)
                .setIssuedAt(new Date())  // Token creation time
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))  // Token expiration time
                .signWith(key,SignatureAlgorithm.HS256)  // Signing the token with the secret key
                .compact();
    }

    // Method to extract username (subject) from the JWT token
    public static String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // Method to extract expiration date from the JWT token
    public static Date extractExpiration(String token) {
        return extractClaims(token).getExpiration();
    }

    // Extracting the claims (payload) from the token
    private static Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Check if the token has expired
    private static boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Validate the JWT token
    public static boolean validateToken(String token, String username) {
        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
    }
    public static boolean validateToken(String token){
        return (!isTokenExpired(token));
    }
}

