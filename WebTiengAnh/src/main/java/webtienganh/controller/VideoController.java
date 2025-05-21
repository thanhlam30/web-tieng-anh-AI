package webtienganh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import webtienganh.dto.PaginationWrapper;
import webtienganh.dto.VideoDTO;
import webtienganh.dto.VideoSummaryDTO;
import webtienganh.service.VideoService;

@RestController
@RequestMapping("/videos")
@CrossOrigin
public class VideoController {

	@Autowired
	private VideoService videoService;

	@GetMapping("")
	public PaginationWrapper<List<VideoSummaryDTO>> getListSummaries(@RequestParam("categorySlug") String categorySlug,
			@RequestParam(name = "timeFrom", required = false, defaultValue = "0") long timeFrom,
			@RequestParam(name = "timeTo", required = false, defaultValue = "0") long timeTo,
			@RequestParam(name = "level", required = false, defaultValue = "0") int level,
			@RequestParam(name = "page", required = false, defaultValue = "0") int page,
			@RequestParam(name = "size", required = false, defaultValue = "12") int size) {

		return videoService.getListSummaries(categorySlug, timeFrom, timeTo, level, page, size);
	}

	@GetMapping("/{slug}")
	public VideoDTO getOneBySlug(@PathVariable("slug") String slug) {

		return videoService.getOne(slug);
	}
}
