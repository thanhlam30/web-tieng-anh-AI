package webtienganh.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.cloudinary.Cloudinary;

@Configuration
@EnableJpaAuditing
public class AppConfig {

	@Value("${CLOUDINARY_URL}")
	private String cloudinaryUrl;

	@Bean
	public Cloudinary cloudinaryConfig() {

		return new Cloudinary(cloudinaryUrl);
	}
}
