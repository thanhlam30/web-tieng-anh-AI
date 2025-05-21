package webtienganh.service;

import org.springframework.web.multipart.MultipartFile;

import webtienganh.dto.ParagraphDTO;

public interface ParagraphService {

	ParagraphDTO save(ParagraphDTO paragraphDTO);
	String uploadAudio(int id, MultipartFile audioFile);
	String uploadImage(int id, MultipartFile imageFile);
}
