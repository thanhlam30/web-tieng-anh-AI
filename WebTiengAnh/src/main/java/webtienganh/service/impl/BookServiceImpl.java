package webtienganh.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import webtienganh.converter.BookConverter;
import webtienganh.dto.BookDTO;
import webtienganh.entity.Book;
import webtienganh.exception.MyExceptionHelper;
import webtienganh.service.BookRepository;
import webtienganh.service.BookService;
import webtienganh.service.CloudinaryService;
import webtienganh.utils.FileUtils;
import webtienganh.utils.MyConstant;

@Service
@Transactional
public class BookServiceImpl implements BookService {

	@Autowired
	private BookRepository bookRepository;

	@Autowired
	private BookConverter bookConverter;

	@Autowired
	private CloudinaryService cloudinaryService;

	@Override
	public List<BookDTO> getAll() {

		return bookRepository.findAll().stream().map(book -> bookConverter.toBookDTO(book))
				.collect(Collectors.toList());
	}

	@Override
	public BookDTO save(BookDTO bookDTO) {
		validate(bookDTO);

		Book bookWasSave = bookRepository.save(bookConverter.toBook(bookDTO));

		return bookConverter.toBookDTO(bookWasSave);
	}

	private void validate(BookDTO bookDTO) {
		if (bookDTO == null || bookDTO.getId() < 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Integer id = bookDTO.getId();

		if (id != 0 && !bookRepository.existsById(id))
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.BOOK);

		if (bookRepository.existsByIdNotAndName(id, bookDTO.getName())) {
			Map<String, String> error = new HashMap<>();
			error.put("name", "Tên sách bị trùng");
			throw MyExceptionHelper.throwRuntimeCustomException(error);
		}

	}

	@Override
	public void delete(Integer id) {

		if (id == null || id <= 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Book book = bookRepository.findById(id)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.BOOK));

		String image = book.getImage();
		bookRepository.deleteById(id);

		if (image != null) {

			String publicId = FileUtils.getPuclidId(image);
			cloudinaryService.deleteFile(publicId, "");
		}

	}

	@Override
	public String uploadImage(Integer id, MultipartFile image) {
		if (id == null || image == null)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Book book = bookRepository.findById(id)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.BOOK));

		String imageString = book.getImage();
		if (imageString != null) {

			String publicId = FileUtils.getPuclidId(imageString);
			cloudinaryService.deleteFile(publicId, "");
		}

		String blogImage = cloudinaryService.uploadFile(image, "");
		book.setImage(blogImage);

		bookRepository.save(book);

		return blogImage;
	}

}
