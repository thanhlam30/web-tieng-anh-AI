package webtienganh.service.impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import webtienganh.converter.ExamConverter;
import webtienganh.converter.QuestionConverter;
import webtienganh.dto.ExamDTO;
import webtienganh.dto.ExamQuestionDTO;
import webtienganh.dto.ExamResultDTO;
import webtienganh.dto.NameSlugDTO;
import webtienganh.dto.PaginationWrapper;
import webtienganh.entity.Exam;
import webtienganh.exception.MyExceptionHelper;
import webtienganh.repository.ExamRepository;
import webtienganh.repository.ParagraphRepository;
import webtienganh.repository.QuestionRepository;
import webtienganh.service.BookRepository;
import webtienganh.service.CloudinaryService;
import webtienganh.service.ExamService;
import webtienganh.service.QuestionService;
import webtienganh.utils.EntityValidator;
import webtienganh.utils.FileUtils;
import webtienganh.utils.MyConstant;
import webtienganh.utils.MyConsumer;

@Service
@Transactional
public class ExamServiceImpl implements ExamService {

	@Autowired
	private ExamRepository examRepository;
	@Autowired
	private ExamConverter examConverter;

	@Autowired
	private QuestionRepository questionRepository;
	@Autowired
	private QuestionConverter questionConverter;
	@Autowired
	private QuestionService questionService;

	@Autowired
	private ParagraphRepository paragraphRepository;

	@Autowired
	private BookRepository bookRepository;

	@Autowired
	private CloudinaryService cloudinaryService;

	@Override
	public ExamQuestionDTO getExamQuestion(String slug) {

		if (slug == null)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Exam exam = examRepository.findBySlug(slug)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.EXAM));

		return examConverter.toExamQuestionDTO(exam);
	}

	@Override
	public ExamResultDTO getExamResult(String slug, Map<Integer, String> answers) {

		if (slug == null || answers == null)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Exam exam = examRepository.findBySlug(slug)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.EXAM));

		return examConverter.toExamResultDTO(exam, answers);
	}

	@Override
	public List<NameSlugDTO> getListNameSlugs() {

		return examRepository.findAll().stream().map(examEle -> new NameSlugDTO(examEle.getName(), examEle.getSlug()))
				.collect(Collectors.toList());
	}

	@Override
	public List<Object> getQuestionsOfPart(String slug, int type) {

		if (slug == null || type < 1 || type > 7)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Exam exam = examRepository.findBySlug(slug)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.EXAM));
		Integer examId = exam.getId();

		if (type == 1 || type == 2 || type == 5) {

			return questionRepository.findAllByTypeAndExamIdOrderByStt(type, examId).stream()
					.map(questionEle -> questionConverter.toQuestionDTO(questionEle)).collect(Collectors.toList());
		}

		return paragraphRepository.findAllByExamIdAndQuestionType(examId, type).stream()
				.map(paragraphEle -> examConverter.toPart3_4_6_7GroupDTO(paragraphEle)).collect(Collectors.toList());
	}

	@Override
	public PaginationWrapper<List<ExamDTO>> getList(String name, String bookName, int page, int size) {

		if (name == null || bookName == null || page < 0 || size <= 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Page<Exam> examsPage = examRepository.findAllByNameContainingAndBookNameContaining(name, bookName,
				PageRequest.of(page, size));

		var examDTOsPageResult = new PaginationWrapper<List<ExamDTO>>();
		examDTOsPageResult.setPage(page);
		examDTOsPageResult.setSize(page);
		examDTOsPageResult.setTotalPages(examsPage.getTotalPages());

		List<ExamDTO> examDTOs = examsPage.toList().stream().map(examEle -> examConverter.toExamDTO(examEle))
				.collect(Collectors.toList());
		examDTOsPageResult.setData(examDTOs);

		return examDTOsPageResult;
	}

	@Override
	public ExamDTO save(ExamDTO examDTO) {

		validate(examDTO);

		Exam exam = examRepository.save(examConverter.toExam(examDTO));

		return examConverter.toExamDTO(exam);
	}

	@Override
	public ExamDTO add(ExamDTO examDTO, int[] stts) {

		ExamDTO examDTOResult = save(examDTO);

		stts[0] = MyConstant.PART7_START_STT;
		questionService.createQuestions(examDTOResult.getId(), stts);

		return examDTOResult;
	}

	private void validate(ExamDTO examDTO) {

		if (examDTO == null || examDTO.getId() == null || examDTO.getId() < 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Integer id = examDTO.getId();
		if (id != 0 && !examRepository.existsById(id))
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.EXAM);

		EntityValidator.checkValidate(errors -> {

			if (examRepository.existsByIdNotAndName(id, examDTO.getName()))
				errors.put("name", "Tên Exam đã trùng");

			if (!bookRepository.existsById(examDTO.getBookId()))
				errors.put("bookId", "Book không tồn tại");

		});

	}

	@Override
	public void delete(Integer id) {

		if (id == null || id <= 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		if (!examRepository.existsById(id))
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.EXAM);

		paragraphRepository.deleteAllById(paragraphRepository.getIds(id));
		examRepository.deleteById(id);

	}

	@Override
	public void uploadAudio(int id, MultipartFile part1Audio, MultipartFile part2Audio, MultipartFile part3Audio,
			MultipartFile part4Audio) {

		if (id <= 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Exam exam = examRepository.findById(id)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.EXAM));

		// part1
		uploadAudio(part1Audio, exam.getPart1Audio(), (audioUpload) -> {

			exam.setPart1Audio(audioUpload);
		});

		uploadAudio(part2Audio, exam.getPart2Audio(), (audioUpload) -> {

			exam.setPart2Audio(audioUpload);
		});

		uploadAudio(part3Audio, exam.getPart3Audio(), (audioUpload) -> {

			exam.setPart3Audio(audioUpload);
		});

		uploadAudio(part4Audio, exam.getPart4Audio(), (audioUpload) -> {

			exam.setPart4Audio(audioUpload);
		});

	}

	public void uploadAudio(MultipartFile audio, String audioString, MyConsumer<String> myConsumer) {

		if (audio == null)
			return;

		if (audioString != null) {
			String publicId = FileUtils.getPuclidId(audioString);
			cloudinaryService.deleteFile(publicId, MyConstant.VIDEO);
		}

		String audioUpload = cloudinaryService.uploadFile(audio, MyConstant.VIDEO);

		myConsumer.handle(audioUpload);
	}

}
