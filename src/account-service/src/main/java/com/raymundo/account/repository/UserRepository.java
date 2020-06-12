package com.raymundo.account.repository;

import com.raymundo.account.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
