package webtienganh.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import webtienganh.dto.BookDTO;

public interface BookService {

	List<BookDTO> getAll();

	BookDTO save(BookDTO bookDTO);

	void delete(Integer id);

	String uploadImage(Integer id, MultipartFile image);
}
