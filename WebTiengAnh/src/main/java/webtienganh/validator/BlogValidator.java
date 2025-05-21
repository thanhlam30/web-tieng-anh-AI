package webtienganh.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import webtienganh.dto.BlogDTO;
import webtienganh.repository.BlogRepository;

@Component
public class BlogValidator implements Validator {

	@Autowired
	private BlogRepository blogRepository;

	@Override
	public boolean supports(Class<?> clazz) {

		return BlogDTO.class.isAssignableFrom(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {

		if (!supports(target.getClass()))
			return;

		BlogDTO blog = (BlogDTO) target;

		String blogName = blog.getName();
		if (blogRepository.existsByName(blogName))
			errors.rejectValue("name", null, "Tên blog đã bị trùng");

		errors.rejectValue("categoryId", null, "Category đã bị trùng");

	}

	public void validate(BlogDTO blogDTO) {

	}

}
