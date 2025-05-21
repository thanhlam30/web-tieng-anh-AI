package webtienganh.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import webtienganh.dto.AccountDTO;
import webtienganh.dto.UserDTO;
import webtienganh.entity.Provider;
import webtienganh.entity.User;
import webtienganh.entity.UserRole;
import webtienganh.repository.RoleRepository;
import webtienganh.utils.RoleConstant;

@Component
public class UserConverter {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private RoleRepository roleRepository;

	public UserDTO toUserDTO(User user) {

		var userDTO = new UserDTO();
		userDTO.setId(user.getId());
		userDTO.setName(user.getName());
		userDTO.setUsername(user.getUsername());
		userDTO.setImage(user.getImage());
		userDTO.setProvider(user.getProvider().toString());
		userDTO.setEmail(user.getEmail());
		userDTO.setRoles(user.getRolesString());

		return userDTO;
	}

	public User toUser(AccountDTO accountDTO) {

		User user = new User();
		user.setName(accountDTO.getName());
		user.setUsername(accountDTO.getUsername());
		user.setProvider(Provider.local);
		
		String password = passwordEncoder.encode(accountDTO.getPassword());
		user.setPassword(password);
		
		UserRole userRole = new UserRole(user, roleRepository.findByName(RoleConstant.ROLE_BLOG));
		user.getRoles().add(userRole);
		
		
		return user;
	}

}
