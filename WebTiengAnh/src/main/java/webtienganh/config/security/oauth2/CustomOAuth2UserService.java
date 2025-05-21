package webtienganh.config.security.oauth2;

import java.util.Arrays;
import java.util.Optional;

import javax.transaction.Transactional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import webtienganh.config.security.JwtTokenProvider;
import webtienganh.config.security.UserPrincipal;
import webtienganh.config.security.oauth2.user.OAuth2UserInfo;
import webtienganh.config.security.oauth2.user.OAuth2UserInfoFactory;
import webtienganh.entity.Provider;
import webtienganh.entity.Role;
import webtienganh.entity.User;
import webtienganh.entity.UserRole;
import webtienganh.exception.OAuth2AuthenticationProcessingException;
import webtienganh.repository.RoleRepository;
import webtienganh.repository.UserRepository;
import webtienganh.utils.RoleConstant;

@Service
@Transactional
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {

		OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

		try {
			return processOAuth2User(oAuth2UserRequest, oAuth2User);
		} catch (AuthenticationException ex) {
			throw ex;
		} catch (Exception ex) {
			// Throwing an instance of AuthenticationException will trigger the
			// OAuth2AuthenticationFailureHandler
			throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
		}
	}

	private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {

		String key = oAuth2UserRequest.getClientRegistration().getRegistrationId();
		OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(key, oAuth2User.getAttributes());

		if ((StringUtils.isBlank(oAuth2UserInfo.getId())))
			throw new OAuth2AuthenticationProcessingException("Id not found from OAuth2 provider");

		Optional<User> userOptional = userRepository.findByUsername(oAuth2UserInfo.getId());
		User user;

		if (userOptional.isPresent()) {

			user = userOptional.get();
			if (!user.getProvider().equals(Provider.valueOf(key))) {
				throw new OAuth2AuthenticationProcessingException(
						"Looks like you're signed up with " + user.getProvider() + " account. Please use your "
								+ user.getProvider() + " account to login.");
			}

			user = updateExistingUser(user, oAuth2UserInfo);
		} else {

			user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
		}

		return UserPrincipal.create(user, oAuth2User.getAttributes());
	}

	private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {

		User user = new User();
		user.setProvider(Provider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));

		String providerId = oAuth2UserInfo.getId();
		user.setUsername(providerId);
		user.setToken(tokenProvider.generateToken(providerId));

		user.setName(oAuth2UserInfo.getName());
		user.setEmail(oAuth2UserInfo.getEmail());
		user.setImage(oAuth2UserInfo.getImage());

		Role role = roleRepository.findByName(RoleConstant.ROLE_USER);
		user.setRoles(Arrays.asList(new UserRole(user, role)));

		return userRepository.save(user);
	}

	private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
		existingUser.setToken(tokenProvider.generateToken(oAuth2UserInfo.getId()));
		existingUser.setName(oAuth2UserInfo.getName());
		existingUser.setEmail(oAuth2UserInfo.getEmail());
		existingUser.setImage(oAuth2UserInfo.getImage());
		return userRepository.save(existingUser);
	}

}
