package webtienganh.service;

import org.springframework.web.multipart.MultipartFile;

import webtienganh.dto.VideoWordDTO;

public interface VideoWordService {

	VideoWordDTO save(VideoWordDTO videoWordDTO);
	
	void delete(Integer id);
	
	String uploadSound(Integer id, MultipartFile sound);
}
