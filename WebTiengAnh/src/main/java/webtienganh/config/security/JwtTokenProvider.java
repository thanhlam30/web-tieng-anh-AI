package webtienganh.config.security;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;
import webtienganh.config.AppProperties;

@Component
@Slf4j
public class JwtTokenProvider {

	@Autowired
	private AppProperties appProperties;
	
	public String generateToken(String username) {
		// Lấy thông tin user
		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpirationMsec());
		// Tạo chuỗi json web token từ id của user.
		return Jwts.builder().setSubject(username).setIssuedAt(now).setExpiration(expiryDate)
				.signWith(SignatureAlgorithm.HS512, appProperties.getAuth().getTokenSecret()).compact();
	}

	public String getUserIdFromJWT(String token) {
		Claims claims = Jwts.parser().setSigningKey(appProperties.getAuth().getTokenSecret()).parseClaimsJws(token).getBody();

		return claims.getSubject();
	}

	public boolean validateToken(String authToken) {
		try {
			Jwts.parser().setSigningKey(appProperties.getAuth().getTokenSecret()).parseClaimsJws(authToken);
			return true;
		} catch (MalformedJwtException ex) {
			log.error("Invalid JWT token");
		} catch (ExpiredJwtException ex) {
			log.error("Expired JWT token");
		} catch (UnsupportedJwtException ex) {
			log.error("Unsupported JWT token");
		} catch (IllegalArgumentException ex) {
			log.error("JWT claims string is empty.");
		}
		return false;
	}
}
