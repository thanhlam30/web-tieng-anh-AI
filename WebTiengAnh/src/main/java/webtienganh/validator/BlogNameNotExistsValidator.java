package webtienganh.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import webtienganh.repository.BlogRepository;

public class BlogNameNotExistsValidator implements ConstraintValidator<BlogNameNotExists, String> {

	@Autowired
	private BlogRepository blogRepository;

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {

		return !blogRepository.existsByName(value);
	}
}
