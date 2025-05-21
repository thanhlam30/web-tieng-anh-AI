package webtienganh.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import webtienganh.converter.UserConverter;
import webtienganh.dto.AccountDTO;
import webtienganh.dto.PaginationWrapper;
import webtienganh.dto.UserDTO;
import webtienganh.entity.Provider;
import webtienganh.entity.User;
import webtienganh.entity.UserRole;
import webtienganh.exception.MyExceptionHelper;
import webtienganh.repository.RoleRepository;
import webtienganh.repository.UserRepository;
import webtienganh.service.UserService;
import webtienganh.utils.EntityValidator;
import webtienganh.utils.MyConstant;
import webtienganh.utils.RoleConstant;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserConverter userConverter;
	
	@Autowired
	private RoleRepository roleRepository;

	@Override
	public void updateToken(String username, String token) {

		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("Tài khoản không tồn tại"));
		user.setToken(token);

		userRepository.save(user);
	}

	@Override
	public PaginationWrapper<List<UserDTO>> getList(String username, int page, int size) {

		if (username == null || page < 0 || size <= 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Page<User> usersPage = userRepository.findAllByUsernameContaining(username, PageRequest.of(page, size));

		var usersPageResult = new PaginationWrapper<List<UserDTO>>();
		usersPageResult.setPage(page);
		usersPageResult.setSize(size);
		usersPageResult.setTotalPages(usersPage.getTotalPages());

		List<UserDTO> userDTOs = usersPage.toList().stream().map(user -> userConverter.toUserDTO(user))
				.collect(Collectors.toList());
		usersPageResult.setData(userDTOs);

		return usersPageResult;
	}

	@Override
	public UserDTO createAccount(AccountDTO accountDTO) {

		validate(accountDTO);

		User user = userConverter.toUser(accountDTO);
		User saveUser = userRepository.save(user);

		return userConverter.toUserDTO(saveUser);
	}

	public void validate(AccountDTO accountDTO) {

		if (accountDTO == null)
			throw MyExceptionHelper.throwIllegalArgumentException();

		String username = accountDTO.getUsername();

		if (userRepository.existsByUsername(username))
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.USER);

		EntityValidator.checkValidate(errors -> {

			if (userRepository.existsByUsername(username))
				errors.put("username", "User đã tồn tại");
		});

	}

	@Override
	public void delete(int id) {

		getUser(id);
		userRepository.deleteById(id);
	}

	@Override
	public void updateAdminRole(int id) {

		User user = getUser(id);
		
		if(user.isAdmin())
			return;
		
		user.getRoles().clear();
		user.getRoles().add(new UserRole(user, roleRepository.findByName(RoleConstant.ROLE_ADMIN)));
		
		userRepository.save(user);
	}

	@Override
	public void updateRoles(int id, List<String> roles) {
			
		User user = getUser(id);
		
		List<UserRole> userRoles = roles.stream().filter(roleEle ->  RoleConstant.checkNotUserAndAdmin(roleEle))
				.map(roleEle ->   new UserRole(user, roleRepository.findByName(roleEle)) )
				.collect(Collectors.toList());
		
		user.getRoles().clear();
		user.getRoles().addAll(userRoles);
		
		userRepository.save(user);
	}

	private User getUser(int id) {

		if (id <= 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		return userRepository.findByIdAndProvider(id, Provider.local)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.USER));
	}

}
