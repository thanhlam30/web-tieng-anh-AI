package webtienganh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webtienganh.dto.BlogCategoryDTO;
import webtienganh.service.BlogCategoryService;

@RestController
@RequestMapping("/blog-categories")
@CrossOrigin
public class BlogCategoryController {

	@Autowired
	private BlogCategoryService blogCategoryService;

	@GetMapping("")
	public List<BlogCategoryDTO> getList() {

		return blogCategoryService.getList();
	}
}
