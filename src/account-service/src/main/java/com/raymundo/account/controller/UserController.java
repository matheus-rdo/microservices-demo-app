package com.raymundo.account.controller;

import com.raymundo.account.dto.UserCreateDto;
import com.raymundo.account.model.User;
import com.raymundo.account.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;
import java.util.Collection;

@Controller
@RequestMapping(value = "/api/user")
public class UserController {

	@Autowired
	private UserService service;

	@PostMapping
	ResponseEntity<User> createUser(@Valid @RequestBody UserCreateDto userDto) {
		User user = service.createUser(userDto);
		return ResponseEntity.ok(user);
	}

	@GetMapping()
	Collection<User> users() {
		return service.findAllUsers();
	}
}
