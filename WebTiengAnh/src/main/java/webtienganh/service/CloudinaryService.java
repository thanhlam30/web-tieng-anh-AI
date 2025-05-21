package webtienganh.service;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {

	String uploadFile(MultipartFile file, String resource);
	void deleteFile(String publicId, String resource);
}
