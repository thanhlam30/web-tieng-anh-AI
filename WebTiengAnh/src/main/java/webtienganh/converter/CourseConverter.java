package webtienganh.converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import webtienganh.dto.CourseSummaryDTO;
import webtienganh.dto.CourseDTO;
import webtienganh.dto.WordDTO;
import webtienganh.entity.Course;
import webtienganh.entity.Topic;
import webtienganh.repository.CourseRepository;
import webtienganh.utils.CommonFuc;

@Component
public class CourseConverter {

	@Autowired
	private WordConverter wordConverter;

	@Autowired
	private CourseRepository courseRepository;

	public CourseSummaryDTO toCourseInfoRequest(Course course) {

		CourseSummaryDTO result = new CourseSummaryDTO();
		result.setId(course.getId());
		result.setName(course.getName());
		result.setSlug(course.getSlug());
		result.setImage(course.getImage());
		result.setDescription(course.getDescription());
		result.setWordNumber(course.getWords().size());
		result.setPersonNumber(course.getUsers().size());
		result.setTopicId(course.getTopic().getId());

		return result;
	}

	public CourseDTO toCourseRequest(Course course) {

		CourseDTO result = new CourseDTO();
		result.setId(course.getId());
		result.setName(course.getName());
		result.setSlug(course.getSlug());
		result.setImage(course.getImage());
		result.setDescription(course.getDescription());
		result.setWordNumber(course.getWords().size());
		result.setPersonNumber(course.getUsers().size());

		List<WordDTO> wordDTOs = new ArrayList<>();
		course.getWords().forEach(courseWord -> {

			WordDTO wordDTO = wordConverter.toWordDTO(courseWord.getWord());
			wordDTOs.add(wordDTO);
		});
		result.setWords(wordDTOs);

		return result;
	}

	public Course toCourse(CourseSummaryDTO courseSummaryDTO) {

		Integer id = courseSummaryDTO.getId();

		Course courseResult = courseRepository.findById(id).orElse(new Course(0));

		String name = courseSummaryDTO.getName();
		courseResult.setName(name);
		courseResult.setSlug(CommonFuc.toSlug(name));

		courseResult.setDescription(courseSummaryDTO.getDescription());
		courseResult.setTopic(new Topic(courseSummaryDTO.getTopicId()));

		return courseResult;
	}

}
