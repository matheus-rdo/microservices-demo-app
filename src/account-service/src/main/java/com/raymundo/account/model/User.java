package com.raymundo.account.model;

import lombok.Builder;
import lombok.Data;
import lombok.experimental.Tolerate;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "tb_user")
@Data
@Builder
public class User implements Serializable {

	private static final long serialVersionUID = 1L;

	@Tolerate
	public User(){

	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(nullable = false, unique = true)
	private String cpf;

	private String nome;
	private String endereco;

}