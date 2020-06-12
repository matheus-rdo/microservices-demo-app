package com.raymundo.account.service;

import com.raymundo.account.dto.UserCreateDto;
import com.raymundo.account.model.User;
import com.raymundo.account.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public User createUser(UserCreateDto userDto) {
		User user = User.builder().cpf(userDto.getCpf())
				.nome(userDto.getNome())
				.endereco(userDto.getEndereco())
				.build();
		user = userRepository.save(user);

		return user;
	}

	public Collection<User> findAllUsers() {
		return userRepository.findAll(Sort.by(Sort.Direction.ASC, "nome"));
	}
}
