package webtienganh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webtienganh.dto.VideoCategoryDTO;
import webtienganh.service.VideoCategoryService;

@RestController
@RequestMapping("/video-categories")
@CrossOrigin
public class VideoCategoryController {

	@Autowired
	private VideoCategoryService videoCategoryService;

	@GetMapping("")
	public List<VideoCategoryDTO> getList() {

		return videoCategoryService.getList();
	}

}
