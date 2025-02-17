package com.Hr_event_Management.hr_event_management.util;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "YourSuperSecretKeyWithAtLeastyti6ii7threertyuuiuiuyghfbgfbvbvjhurtBitsLength!";
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours
    private final Key key;

    public JwtUtil() {
        this.key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }
    // Method to generate a JWT token
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)  // The user info (usually username or user id)
                .setIssuedAt(new Date())  // Token creation time
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))  // Token expiration time
                .signWith(key, SignatureAlgorithm.HS256)  // Signing the token with the secret key
                .compact();
    }

    // Method to extract username (subject) from the JWT token
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // Method to extract expiration date from the JWT token
    public Date extractExpiration(String token) {
        return extractClaims(token).getExpiration();
    }

    // Extracting the claims (payload) from the token
    private Claims extractClaims(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(key)  // Use the processed Key object
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (JwtException e) {
            throw new RuntimeException("Invalid JWT token", e);
        }
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Validate the JWT token with username
    public boolean validateToken(String token, String username) {
        return username.equals(extractUsername(token)) && !isTokenExpired(token);
    }

    // Validate the JWT token without username (for general use)
    public boolean validateToken(String token) {
        return !isTokenExpired(token);
    }
}
