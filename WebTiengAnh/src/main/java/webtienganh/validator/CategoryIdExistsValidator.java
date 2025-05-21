package webtienganh.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import webtienganh.repository.BlogCategoryRepository;

public class CategoryIdExistsValidator implements ConstraintValidator<CategoryIdExists, Integer> {

	@Autowired
	private BlogCategoryRepository blogCategoryRepository;

	@Override
	public boolean isValid(Integer value, ConstraintValidatorContext context) {

		if(value == null || value <=0 )
			return false;
		
		return blogCategoryRepository.existsById(value);
	}
}
