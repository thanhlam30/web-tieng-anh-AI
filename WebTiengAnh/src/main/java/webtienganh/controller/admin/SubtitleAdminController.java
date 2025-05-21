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

import webtienganh.dto.SubtitleDTO;
import webtienganh.exception.MyExceptionHelper;
import webtienganh.service.SubtitleService;
import webtienganh.utils.MyConstant;
import webtienganh.utils.RestConstant;

@RestController
@RequestMapping("/admin/videos/subtitles")
@CrossOrigin
public class SubtitleAdminController {

	@Autowired
	private SubtitleService subtitleService;

	@PostMapping(value = "", consumes = RestConstant.CONSUMES_JSON)
	@ResponseStatus(code = HttpStatus.CREATED)
	public SubtitleDTO add(@Valid @RequestBody SubtitleDTO subtitleDTO) {

		subtitleDTO.setId(0);
		return subtitleService.save(subtitleDTO);
	}

	@PutMapping(value = "/{id}", consumes = RestConstant.CONSUMES_JSON)
	public SubtitleDTO update(@PathVariable("id") Integer id, @Valid @RequestBody SubtitleDTO subtitleDTO) {

		if (id <= 0)
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.SUBTITLE);

		subtitleDTO.setId(id);
		return subtitleService.save(subtitleDTO);
	}

	@DeleteMapping("/{videoId}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable("videoId") Integer videoId) {

		subtitleService.delete(videoId);
	}
}
