package com.monastery360.controller;

import com.monastery360.dto.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping({"/", "/health"})
    public String root() {
        return "Monastery360 Backend is running";
    }

    @GetMapping("/api/health")
    public ApiResponse<String> apiHealth() {
        return ApiResponse.ok("ok");
    }
}


