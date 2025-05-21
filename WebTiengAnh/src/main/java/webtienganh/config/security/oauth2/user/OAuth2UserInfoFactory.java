package webtienganh.config.security.oauth2.user;

import java.util.Map;

import webtienganh.entity.Provider;
import webtienganh.exception.OAuth2AuthenticationProcessingException;

public class OAuth2UserInfoFactory {

	public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {

		if (registrationId.equalsIgnoreCase(Provider.google.toString()))
			return new GoogleOAuth2UserInfo(attributes);

		if (registrationId.equalsIgnoreCase(Provider.facebook.toString()))
			return new FacebookOAuth2UserInfo(attributes);

		throw new OAuth2AuthenticationProcessingException(
				"Sorry! Login with " + registrationId + " is not supported yet.");
	}
}
