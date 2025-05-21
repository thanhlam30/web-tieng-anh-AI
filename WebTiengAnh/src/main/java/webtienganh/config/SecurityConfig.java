package webtienganh.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import webtienganh.config.security.JwtAuthenticationFilter;
import webtienganh.config.security.oauth2.CustomOAuth2UserService;
import webtienganh.config.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import webtienganh.config.security.oauth2.OAuth2AuthenticationFailureHandler;
import webtienganh.config.security.oauth2.OAuth2AuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private CustomOAuth2UserService customOAuth2UserService;

	@Autowired
	private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

	@Autowired
	private OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

	@Bean
	public JwtAuthenticationFilter jwtAuthenticationFilter() {
		return new JwtAuthenticationFilter();
	}

	@Bean
	public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
		return new HttpCookieOAuth2AuthorizationRequestRepository();
	}

	@Bean(BeanIds.AUTHENTICATION_MANAGER)
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {

		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http.cors().and()
//		.sessionManagement()
//        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//        .and()
		.csrf().disable()
		.authorizeRequests()
			.antMatchers("/admin/exams", "/admin/exams/**").hasAnyRole("EXAM", "ADMIN")
			.antMatchers("/admin/videos", "/admin/videos/**").hasAnyRole("VIDEO", "ADMIN")
			.antMatchers("/admin/blogs", "/admin/blogs/**").hasAnyRole("BLOG", "ADMIN")
			.antMatchers("/admin/courses", "/admin/courses/**").hasAnyRole("COURSE", "ADMIN")
			.antMatchers("/admin/**", "/admin/user/**", "/admin/user" ).hasRole("ADMIN")
			.antMatchers("/user/**").authenticated()
			.anyRequest().permitAll()
			.and()
				.oauth2Login()
				//.loginPage("/login-oauth")
				.authorizationEndpoint()
				.baseUri("/oauth2/authorization")
				.authorizationRequestRepository(cookieAuthorizationRequestRepository())
				.and()
				.userInfoEndpoint().userService(customOAuth2UserService).and()
				.successHandler(oAuth2AuthenticationSuccessHandler).failureHandler(oAuth2AuthenticationFailureHandler);

		// Thêm một lớp Filter kiểm tra jwt
		http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

	}
}
