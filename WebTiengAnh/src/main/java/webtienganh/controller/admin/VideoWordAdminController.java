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

import webtienganh.dto.VideoWordDTO;
import webtienganh.exception.MyExceptionHelper;
import webtienganh.service.VideoWordService;
import webtienganh.utils.MyConstant;
import webtienganh.utils.RestConstant;

@RestController
@RequestMapping("/admin/videos/words")
@CrossOrigin
public class VideoWordAdminController {

	@Autowired
	private VideoWordService videoWordService;

	@PostMapping(value = "", consumes = RestConstant.CONSUMES_JSON)
	@ResponseStatus(code = HttpStatus.CREATED)
	public VideoWordDTO add(@Valid @RequestBody VideoWordDTO videoWordDTO) {

		videoWordDTO.setId(0);
		return videoWordService.save(videoWordDTO);
	}

	@PutMapping(value = "/{id}", consumes = RestConstant.CONSUMES_JSON)
	public VideoWordDTO update(@PathVariable("id") Integer id, @Valid @RequestBody VideoWordDTO videoWordDTO) {

		if (id <= 0)
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.VIDEO_WORD);

		videoWordDTO.setId(id);
		return videoWordService.save(videoWordDTO);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable("id") Integer id) {

		videoWordService.delete(id);
	}

	@PutMapping(value = "/{id}/sound")
	public String updateSound(@PathVariable("id") Integer id, @RequestParam("sound") MultipartFile sound) {

		String fileName = videoWordService.uploadSound(id, sound);
		return fileName;
	}

}
