package webtienganh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import webtienganh.dto.BlogDTO;
import webtienganh.dto.BlogSummaryDTO;
import webtienganh.dto.PaginationWrapper;
import webtienganh.service.BlogService;

@RestController
@RequestMapping("/blogs")
@CrossOrigin
public class BlogController {

	@Autowired
	private BlogService blogService;

	@GetMapping("")
	public PaginationWrapper<List<BlogSummaryDTO>> getListSummaries(
			@RequestParam(name = "name", required = false, defaultValue = "") String name,
			@RequestParam(name = "categorySlug", required = false, defaultValue = "") String categorySlug,
			@RequestParam(name = "page", required = false, defaultValue = "0") int page,
			@RequestParam(name = "size", required = false, defaultValue = "12") int size) {

		return blogService.getListSummaries(name, categorySlug, page, size);
	}

	@GetMapping("/{slug}")
	public BlogDTO getOne(@PathVariable("slug") String slug) {

		return blogService.getOne(slug);
	}
}
