package webtienganh.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import webtienganh.dto.BookDTO;
import webtienganh.entity.Book;
import webtienganh.repository.ExamRepository;
import webtienganh.service.BookRepository;

@Component
public class BookConverter {

	@Autowired
	private ExamRepository examRepository;
	
	@Autowired
	private BookRepository bookRepository;

	public BookDTO toBookDTO(Book book) {

		BookDTO result = new BookDTO();
		result.setId(book.getId());
		result.setName(book.getName());
		result.setImage(book.getImage());
		result.setExams(examRepository.getAllNameSlugOnlysByBookId(book.getId()));

		return result;
	}
	
	public Book toBook(BookDTO bookDTO) {
		
		Integer id = bookDTO.getId();
		
		Book book = bookRepository.findById(id).orElse(new Book(0));
		
		book.setId(bookDTO.getId());
		book.setName(bookDTO.getName());
		
		return book;
	}
}
