package webtienganh.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import webtienganh.entity.User;
import webtienganh.repository.UserRepository;

@Service
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("Tài khoản không tồn tại"));

		return new CustomUserDetails(user);
	}

	public UserDetails loadUserById(String username) {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("Tài khoản không tồn tại"));

		if (user == null)
			return null;

		return new CustomUserDetails(user);
	}

}
