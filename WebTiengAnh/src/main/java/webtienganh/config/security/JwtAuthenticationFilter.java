package webtienganh.config.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.extern.slf4j.Slf4j;
import webtienganh.repository.UserRepository;
import webtienganh.service.impl.UserDetailsServiceImpl;

@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	
	@Autowired
	private UserRepository userRepository;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			String jwt = getJwtFromRequest(request);

			if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
				
				String userId = tokenProvider.getUserIdFromJWT(jwt);
				UserDetails userDetails = userDetailsService.loadUserById(userId);
						
				String userToken = userRepository.findByUsername(userId).get().getToken();
				if (userDetails != null || userToken.equals(jwt) ) {
					
					UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
							userDetails, null, userDetails.getAuthorities());
					authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

					SecurityContextHolder.getContext().setAuthentication(authentication);
				}
				
			}
		} catch (Exception ex) {
			log.error("failed on set user authentication", ex);
		}

		filterChain.doFilter(request, response);
	}

	private String getJwtFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		// Kiểm tra xem header Authorization có chứa thông tin jwt không
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7);
		}
		return null;
	}
}
