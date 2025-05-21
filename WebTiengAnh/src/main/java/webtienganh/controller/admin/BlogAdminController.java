package webtienganh.controller.admin;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import webtienganh.dto.BlogDTO;
import webtienganh.exception.MyExceptionHelper;
import webtienganh.service.BlogService;
import webtienganh.utils.MyConstant;
import webtienganh.utils.RestConstant;

@RestController
@RequestMapping("/admin/blogs")
@CrossOrigin
public class BlogAdminController {

	@Autowired
	private BlogService blogService;

	@GetMapping("/{id}")
	public BlogDTO getOne(@PathVariable("id") Integer id) {

		return blogService.getOne(id);
	}

	@PostMapping(value = "", consumes = RestConstant.CONSUMES_JSON)
	@ResponseStatus(code = HttpStatus.CREATED)
	public BlogDTO addBlog(@Valid @RequestBody BlogDTO blogDTO) {

		blogDTO.setId(0);
		return blogService.save(blogDTO);
	}

	@PutMapping(value = "/{id}", consumes = RestConstant.CONSUMES_JSON)
	public BlogDTO updateBlog(@PathVariable("id") Integer id, @Valid @RequestBody BlogDTO blogDTO) {

		if(id <= 0)
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.BLOG);
		
		blogDTO.setId(id);

		return blogService.save(blogDTO);
	}

	@PutMapping(value = "/{id}/image")
	public String updateImage(@PathVariable("id") Integer id, @RequestParam("image") MultipartFile image) {

		String fileName = blogService.uploadImage(id, image);

		return fileName;
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void deleteBlog(@PathVariable("id") Integer id) {

		blogService.delete(id);
	}

}
