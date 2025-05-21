package webtienganh.service;

import java.util.List;

import webtienganh.dto.BlogCategoryDTO;

public interface BlogCategoryService {

	List<BlogCategoryDTO> getList();
	
	BlogCategoryDTO save(BlogCategoryDTO blogCategoryDTO);
	void delete(Integer id);
}
