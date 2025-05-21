package webtienganh.config.security.oauth2.user;

import java.util.Map;

public abstract class OAuth2UserInfo {
	protected Map<String, Object> attributes;

	public OAuth2UserInfo(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	public Map<String, Object> getAttributes() {
		return attributes;
	}

	public abstract String getId();

	public abstract String getName();

	public abstract String getEmail();

	public abstract String getImage();

	@Override
	public String toString() {

		return String.format("Id: %s \n Name: %s \n Email: %s \n Image: ", this.getId(), this.getName(),
				this.getEmail(), this.getImage());
	}
}
