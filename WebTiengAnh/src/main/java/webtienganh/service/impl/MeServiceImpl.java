package webtienganh.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import webtienganh.dto.NameRoleOnlyDTO;
import webtienganh.entity.User;
import webtienganh.exception.MyExceptionHelper;
import webtienganh.repository.UserRepository;
import webtienganh.service.MeService;
import webtienganh.utils.AuthenInfo;
import webtienganh.utils.MyConstant;

@Service
@Transactional
public class MeServiceImpl implements MeService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public NameRoleOnlyDTO getNameRoleOnly() {

		AuthenInfo.checkLogin();

		String username = AuthenInfo.getUsername();
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.USER));

		List<String> roles = user.getRoles().stream().map(userRole -> userRole.getRole().getName())
				.collect(Collectors.toList());

		return new NameRoleOnlyDTO(user.getName(), roles);
	}

}
