package webtienganh.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import webtienganh.dto.BlogDTO;
import webtienganh.dto.BlogSummaryDTO;
import webtienganh.dto.PaginationWrapper;

public interface BlogService {

	PaginationWrapper<List<BlogSummaryDTO>> getListSummaries(String name, String categorySlug, int page, int size);

	BlogDTO getOne(String slug);

	BlogDTO save(BlogDTO blogDTO);

	BlogDTO getOne(Integer id);
	
	String uploadImage(Integer id, MultipartFile image);
	
	void delete(Integer id);
}
