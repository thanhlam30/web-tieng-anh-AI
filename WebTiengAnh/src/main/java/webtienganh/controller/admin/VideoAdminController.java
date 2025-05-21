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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import webtienganh.dto.VideoDTO;
import webtienganh.exception.MyExceptionHelper;
import webtienganh.service.VideoService;
import webtienganh.utils.MyConstant;
import webtienganh.utils.RestConstant;

@RestController
@RequestMapping("/admin/videos")
@CrossOrigin
public class VideoAdminController {

	@Autowired
	private VideoService videoService;

	@PostMapping(value = "", consumes = RestConstant.CONSUMES_JSON)
	@ResponseStatus(code = HttpStatus.CREATED)
	public VideoDTO add(@Valid @RequestBody VideoDTO videoDTO) {

		videoDTO.setId(0);
		return videoService.save(videoDTO);
	}

	@PutMapping(value = "/{id}", consumes = RestConstant.CONSUMES_JSON)
	public VideoDTO update(@PathVariable("id") Integer id, @Valid @RequestBody VideoDTO videoDTO) {

		if (id <= 0)
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.VIDEO);

		videoDTO.setId(id);
		return videoService.save(videoDTO);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable("id") Integer id) {

		videoService.delete(id);
	}

	@PutMapping(value = "/{id}/image")
	public String updateImage(@PathVariable("id") Integer id, @RequestParam("image") MultipartFile image) {

		String fileName = videoService.uploadImage(id, image);
		return fileName;
	}

	@PutMapping(value = "/{id}/video")
	public String updateSound(@PathVariable("id") Integer id, @RequestParam("video") MultipartFile video) {

		String fileName = videoService.uploadVideo(id, video);
		return fileName;
	}
	
}
