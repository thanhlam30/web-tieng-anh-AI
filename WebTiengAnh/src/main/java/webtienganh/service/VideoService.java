package webtienganh.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import webtienganh.dto.PaginationWrapper;
import webtienganh.dto.VideoDTO;
import webtienganh.dto.VideoSummaryDTO;

public interface VideoService {

	PaginationWrapper<List<VideoSummaryDTO>> getListSummaries(String categorySlug, long timeFrom, long timeTo,
			int level, int page, int size);

	VideoDTO getOne(String slug);
	

	VideoDTO save(VideoDTO videoDTO);
	
	String uploadImage(Integer id, MultipartFile image);
	
	String uploadVideo(Integer id, MultipartFile video);
	
	void delete(Integer id);
	
}
