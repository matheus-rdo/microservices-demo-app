package com.raymundo.account.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.raymundo.account.dto.UserCreateDto;
import com.raymundo.account.model.User;
import com.raymundo.account.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
@Slf4j
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RabbitTemplate rabbitTemplate;

	@Autowired
	private Queue queue;


	public User createUser(UserCreateDto userDto) {
		User user = User.builder().cpf(userDto.getCpf())
				.nome(userDto.getNome())
				.endereco(userDto.getEndereco())
				.build();
		user = userRepository.save(user);
		sendToQueue(userDto);
		return user;
	}

	public Collection<User> findAllUsers() {
		List<User> users = userRepository.findAll();
		return users;
	}

	public void sendToQueue(UserCreateDto userCreateDto) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			String json = mapper.writeValueAsString(userCreateDto);
			rabbitTemplate.convertAndSend(this.queue.getName(), json);
			log.info("User created message sent to queue");
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

	}
}
