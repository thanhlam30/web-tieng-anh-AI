package webtienganh.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import webtienganh.converter.SubtitleConverter;
import webtienganh.dto.SubtitleDTO;
import webtienganh.entity.Subtitle;
import webtienganh.exception.MyExceptionHelper;
import webtienganh.repository.SubtitleRepository;
import webtienganh.repository.VideoRepository;
import webtienganh.service.SubtitleService;
import webtienganh.utils.EntityValidator;
import webtienganh.utils.MyConstant;

@Service
@Transactional
public class SubtitleServiceImpl implements SubtitleService {

	@Autowired
	private SubtitleRepository subtitleRepository;

	@Autowired
	private SubtitleConverter subtitleConverter;

	@Autowired
	private VideoRepository videoRepository;

	@Override
	public SubtitleDTO save(SubtitleDTO subtitleDTO) {

		validate(subtitleDTO);

		Subtitle subtitle = subtitleRepository.save(subtitleConverter.toSubtitle(subtitleDTO));

		return subtitleConverter.toSubtitleDTO(subtitle);
	}

	private void validate(SubtitleDTO subtitleDTO) {

		if (subtitleDTO == null || subtitleDTO.getId() < 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Integer id = subtitleDTO.getId();

		if (id != 0 && !subtitleRepository.existsById(id))
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.SUBTITLE);

		EntityValidator.checkValidate(error -> {

			if (subtitleDTO.getStart() >= subtitleDTO.getEnd())
				error.put("start", "Start < End");

			if (!videoRepository.existsById(subtitleDTO.getVideoId()))
				error.put("videoId", "Video không tồn tại");

		});

	}

	@Override
	public void delete(Integer videoId) {

		if (videoId == null || videoId <= 0 || !videoRepository.existsById(videoId))
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.VIDEO);

		int size = subtitleRepository.countByVideoId(videoId);

		subtitleRepository.deleteBySttAndVideoId(size-1, videoId);
	}
}
