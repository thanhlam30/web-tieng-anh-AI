package webtienganh.controller.admin;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import webtienganh.dto.BlogCategoryDTO;
import webtienganh.exception.MyExceptionHelper;
import webtienganh.service.BlogCategoryService;
import webtienganh.utils.MyConstant;
import webtienganh.utils.RestConstant;

@RestController
@RequestMapping("/admin/blogs/categories")
@CrossOrigin
public class BlogCategoryAdminController {

	@Autowired
	private BlogCategoryService blogCategoryService;

	@PostMapping(value = "", consumes = RestConstant.CONSUMES_JSON)
	@ResponseStatus(code = HttpStatus.CREATED)
	public BlogCategoryDTO addCategory(@Valid @RequestBody BlogCategoryDTO blogCategoryDTO) {

		blogCategoryDTO.setId(0);
		return blogCategoryService.save(blogCategoryDTO);
	}

	@PutMapping(value = "/{id}", consumes = RestConstant.CONSUMES_JSON)
	public BlogCategoryDTO updateCategory(@PathVariable("id") Integer id,
			@Valid @RequestBody BlogCategoryDTO blogCategoryDTO) {

		if(id <= 0)
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.BLOG_CATEGORY);
		
		blogCategoryDTO.setId(id);
		return blogCategoryService.save(blogCategoryDTO);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void deleteCategory(@PathVariable("id") Integer id) {

		blogCategoryService.delete(id);
	}

}
