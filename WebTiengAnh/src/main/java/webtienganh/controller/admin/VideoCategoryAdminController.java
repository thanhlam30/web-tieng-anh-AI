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

import webtienganh.dto.VideoCategoryDTO;
import webtienganh.exception.MyExceptionHelper;
import webtienganh.service.VideoCategoryService;
import webtienganh.utils.MyConstant;
import webtienganh.utils.RestConstant;

@RestController
@RequestMapping("/admin/videos/categories")
@CrossOrigin
public class VideoCategoryAdminController {

	@Autowired
	private VideoCategoryService videoCategoryService;

	@PostMapping(value = "", consumes = RestConstant.CONSUMES_JSON)
	@ResponseStatus(code = HttpStatus.CREATED)
	public VideoCategoryDTO addCategory(@Valid @RequestBody VideoCategoryDTO videoCategoryDTO) {

		videoCategoryDTO.setId(0);
		return videoCategoryService.save(videoCategoryDTO);
	}

	@PutMapping(value = "/{id}", consumes = RestConstant.CONSUMES_JSON)
	public VideoCategoryDTO updateCategory(@PathVariable("id") Integer id,
			@Valid @RequestBody VideoCategoryDTO videoCategoryDTO) {

		if(id <= 0)
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.VIDEO_CATEGORY);
		
		videoCategoryDTO.setId(id);
		return videoCategoryService.save(videoCategoryDTO);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void deleteCategory(@PathVariable("id") Integer id) {

		videoCategoryService.delete(id);
	}

}
