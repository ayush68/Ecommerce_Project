package com.ayush.ecommerce.aop;

import java.io.IOException;
import java.time.Instant;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.ayush.ecommerce.exception.ResourceNotFoundException;
import com.ayush.ecommerce.model.dto.ErrorResponse;

import jakarta.servlet.http.HttpServletRequest;

@Aspect
@Component
public class GlobalExceptionAspect {

    @Around("execution(* com.ayush.ecommerce.controllers..*(..))")
    public Object handleControllerExceptions(ProceedingJoinPoint joinPoint) throws Throwable {
        try {
            return joinPoint.proceed();
        } catch (ResourceNotFoundException ex) {
            return buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
        } catch (IOException ex) {
            return buildErrorResponse("Unable to process the request due to an I/O error.", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (IllegalArgumentException ex) {
            return buildErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Throwable ex) {
            return buildErrorResponse("Something went wrong. Please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private ResponseEntity<ErrorResponse> buildErrorResponse(String message, HttpStatus status) {
        String path = extractRequestPath();
        ErrorResponse errorResponse = new ErrorResponse(
                Instant.now(),
                status.value(),
                status.getReasonPhrase(),
                message,
                path
        );
        return new ResponseEntity<>(errorResponse, status);
    }

    private String extractRequestPath() {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (requestAttributes == null) {
            return "unknown";
        }

        HttpServletRequest request = requestAttributes.getRequest();
        return request != null ? request.getRequestURI() : "unknown";
    }
}
