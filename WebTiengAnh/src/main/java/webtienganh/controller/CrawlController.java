package webtienganh.controller;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import webtienganh.converter.VideoConverter;
import webtienganh.converter.WordConverter;
import webtienganh.dto.BlogDTO;
import webtienganh.dto.CourseDTO;
import webtienganh.dto.Part3_4_6_7GroupDTO;
import webtienganh.dto.QuestionDTO;
import webtienganh.dto.VideoDTO;
import webtienganh.dto.VideoWordDTO;
import webtienganh.dto.WordDTO;
import webtienganh.entity.Audio;
import webtienganh.entity.Book;
import webtienganh.entity.Course;
import webtienganh.entity.CourseWord;
import webtienganh.entity.CourseWord_PK;
import webtienganh.entity.Exam;
import webtienganh.entity.Paragraph;
import webtienganh.entity.Question;
import webtienganh.entity.QuestionParagraph;
import webtienganh.entity.Subtitle;
import webtienganh.entity.Topic;
import webtienganh.entity.Video;
import webtienganh.entity.VideoWord;
import webtienganh.entity.Word;
import webtienganh.repository.AudioRepository;
import webtienganh.repository.CourseRepository;
import webtienganh.repository.CourseWordRepository;
import webtienganh.repository.ExamRepository;
import webtienganh.repository.ParagraphRepository;
import webtienganh.repository.QuestionParagraphRepository;
import webtienganh.repository.QuestionRepository;
import webtienganh.repository.SubtitleRepository;
import webtienganh.repository.VideoRepository;
import webtienganh.repository.VideoWordRepository;
import webtienganh.repository.WordRepository;
import webtienganh.service.BlogService;
import webtienganh.utils.CommonFuc;
import webtienganh.utils.ExamCrawl;

@RestController
@RequestMapping(value = "/crawl")
@Transactional
public class CrawlController {

	@Autowired
	private CourseRepository courseRepository;

	@Autowired
	private WordRepository wordRepository;

	@Autowired
	private CourseWordRepository courseWordRepository;
	@Autowired
	private WordConverter wordConverter;

	@Autowired
	private ExamRepository examRepository;

	@Autowired
	private AudioRepository audioRepository;

	@Autowired
	private QuestionRepository questionRepository;

	@Autowired
	private ParagraphRepository paragraphRepository;

	@Autowired
	private QuestionParagraphRepository questionParagraphRepository;

	@Autowired
	private VideoRepository videoRepository;
	@Autowired
	private VideoConverter videoConverter;

	@Autowired
	private VideoWordRepository videoWordRepository;

	@PostMapping("/courses")
	public void crawlCourse(@RequestBody CourseDTO courseReq, @RequestParam("topicId") Integer topicId) {

		Integer courseId = saveCourse(courseReq, topicId);

		for (WordDTO word : courseReq.getWords()) {

			String name = word.getName();
			Optional<Word> wordOpt = wordRepository.findByName(name);

			Integer wordId = 0;
			if (wordOpt.isPresent()) {

				wordId = wordOpt.get().getId();
			} else {

				wordId = saveWord(word);
			}

			if (!courseWordRepository.existsById(new CourseWord_PK(courseId, wordId))) {

				CourseWord courseWord = new CourseWord(new Course(courseId), new Word(wordId));
				courseWordRepository.save(courseWord);
			}

		}

	}

	private Integer saveCourse(CourseDTO courseReq, Integer topicId) {

		String name = courseReq.getName();
		String slug = CommonFuc.toSlug(name);

		Optional<Course> courseOpt = courseRepository.findBySlug(slug);
		if (courseOpt.isPresent())
			return courseOpt.get().getId();

		Course course = new Course(name, slug, courseReq.getImage(), courseReq.getDescription(), new Topic(topicId));

		return courseRepository.save(course).getId();

	}

	private Integer saveWord(WordDTO wordDTO) {

		Word word = wordConverter.toWord(wordDTO);

		return wordRepository.save(word).getId();

	}

	@PostMapping("/exams")
	public void crawlExam(@RequestBody ExamCrawl examCrawl) {

		int examId = saveExam(examCrawl);

		// luu part 1
		savePart1_2_5(examCrawl.getPart1(), 1, examId);
		// luu part 2
		savePart1_2_5(examCrawl.getPart2(), 2, examId);
		// luu part3
		savePart3_4_6_7(examCrawl.getPart3(), 3, examId);
		// luu part4
		savePart3_4_6_7(examCrawl.getPart4(), 4, examId);
		// luu part5
		savePart1_2_5(examCrawl.getPart5(), 5, examId);
		// luu part 6
		savePart3_4_6_7(examCrawl.getPart6(), 6, examId);
		// luu part3
		savePart3_4_6_7(examCrawl.getPart7(), 7, examId);
	}

	private void savePart3_4_6_7(List<Part3_4_6_7GroupDTO> list, int type, int examId) {

		for (Part3_4_6_7GroupDTO group : list) {
			Paragraph paragraph = new Paragraph();
			paragraph.setContent(group.getParagraph());
			paragraph.setTranscript(group.getTranscript());

			Integer paragraphId = paragraphRepository.save(paragraph).getId();

			for (QuestionDTO tempt : group.getQuestions()) {

				Question question = new Question();
				question.setStt(tempt.getStt());
				question.setType(type);
				question.setContent(tempt.getContent());
				question.setA(tempt.getA());
				question.setB(tempt.getB());
				question.setC(tempt.getC());
				question.setD(tempt.getD());
				question.setResult(tempt.getResult());
				question.setExam(new Exam(examId));

				Integer questionId = questionRepository.save(question).getId();

				QuestionParagraph questionParagraph = new QuestionParagraph();
				questionParagraph.setQuestion(new Question(questionId));
				questionParagraph.setParagraph(new Paragraph(paragraphId));

				questionParagraphRepository.save(questionParagraph);

			}

		}
	}

	private void savePart1_2_5(List<QuestionDTO> questionDTOs, int type, int examId) {

		for (QuestionDTO tempt : questionDTOs) {

			Question question = new Question();
			question.setStt(tempt.getStt());
			question.setType(type);
			question.setContent(tempt.getContent());
			question.setA(tempt.getA());
			question.setB(tempt.getB());
			question.setC(tempt.getC());
			question.setD(tempt.getD());
			question.setResult(tempt.getResult());
			question.setExam(new Exam(examId));

			Integer questionId = questionRepository.save(question).getId();

			String audioName = tempt.getAudio();

			// nếu có audio thì lưu
			if (audioName == null)
				continue;

			Audio audio = new Audio();
			audio.setName(tempt.getAudio());
			audio.setQuestion(new Question(questionId));

			audioRepository.save(audio);

		}
	}

	private int saveExam(ExamCrawl examCrawl) {

		Exam exam = new Exam();
		exam.setName(examCrawl.getName());
		exam.setSlug(CommonFuc.toSlug(examCrawl.getName()));
		exam.setPart1Audio(examCrawl.getPart1audio());
		exam.setPart2Audio(examCrawl.getPart2audio());
		exam.setBook(new Book(examCrawl.getBookId()));

		return examRepository.save(exam).getId();
	}

	@PostMapping(value = "/videos")
	public void saveVideo(@RequestBody VideoDTO videoDTO) {

		if (videoRepository.existsByName(videoDTO.getName()))
			return;

		System.out.println("=== video: " + videoDTO.getName());

		Video video = videoConverter.toVideoCrawl(videoDTO);
		Integer id;

		id = videoRepository.save(video).getId();

		for (VideoWordDTO videoWordDTO : videoDTO.getVideoWords()) {

			VideoWord videoWord = new VideoWord();
			videoWord.setName(videoWordDTO.getName());
			videoWord.setOrigin(videoWordDTO.getOrigin());
			videoWord.setSound(videoWordDTO.getSound());
			videoWord.setFrequency(videoWordDTO.getFrequency() == 0 ? 1 : videoWordDTO.getFrequency());
			videoWord.setVideo(new Video(id));

			videoWordRepository.save(videoWord);

		}

	}

	@Autowired
	private BlogService blogService;

	@PostMapping("/blogs")
	public void saveBlog(@RequestBody List<BlogDTO> blogDTOs) {

		System.out.println("size: " + blogDTOs.size());
		for (BlogDTO blogDTO : blogDTOs) {

			blogService.save(blogDTO);
		}

	}

	@Autowired
	private SubtitleRepository subtitleRepository;

//	@GetMapping("/them-stt/{categoryId}")
//	public void themSTT(@PathVariable("categoryId") int categoryId) {
//
//		List<Video> videos = videoRepository.findAllByCategoryId(categoryId);
//
//		for (Video video : videos) {
//
//			List<Subtitle> subtitles = subtitleRepository.findAllByVideoIdOrderByStartAsc(video.getId());
//
//			System.out.println("size: "+subtitles.size() );
//			for (int i = 0; i < subtitles.size(); i++) {
//
//				Subtitle subtitleTempt = subtitles.get(i);
//				subtitleTempt.setStt(i);
//
//				subtitleRepository.save(subtitleTempt);
//
//			}
//		}
//		
//		System.out.println("Thanh cong");
//
//	}

}
