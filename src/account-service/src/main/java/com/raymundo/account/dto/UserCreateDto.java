package com.raymundo.account.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;

@Data
public class UserCreateDto {


	@NotBlank
	private String cpf;
	@Length(min = 3)
	@NotBlank
	private String nome;
	@NotBlank
	private String endereco;
	private BigDecimal remuneracao;

}
