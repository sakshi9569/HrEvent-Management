package com.Hr_event_Management.hr_event_management.config;

import com.Hr_event_Management.hr_event_management.interceptor.AuthInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private AuthInterceptor authInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // Add the interceptor and specify the paths where it should be applied
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/user/**")   // Apply the interceptor to all /user/** endpoints
                .excludePathPatterns("/user/signup", "/user/login");  // Exclude login and signup paths
    }
}
