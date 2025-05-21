package webtienganh.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import webtienganh.converter.VideoWordConverter;
import webtienganh.dto.VideoWordDTO;
import webtienganh.entity.VideoWord;
import webtienganh.exception.MyExceptionHelper;
import webtienganh.repository.VideoRepository;
import webtienganh.repository.VideoWordRepository;
import webtienganh.service.CloudinaryService;
import webtienganh.service.VideoWordService;
import webtienganh.utils.EntityValidator;
import webtienganh.utils.FileUtils;
import webtienganh.utils.MyConstant;

@Service
@Transactional
public class VideoWordServiceImpl implements VideoWordService {

	@Autowired
	private VideoWordRepository videoWordRepository;

	@Autowired
	private VideoWordConverter videoWordConverter;

	@Autowired
	private VideoRepository videoRepository;

	@Autowired
	private CloudinaryService cloudinaryService;

	@Override
	public VideoWordDTO save(VideoWordDTO videoWordDTO) {

		validate(videoWordDTO);

		VideoWord videoWord = videoWordRepository.save(videoWordConverter.toVideoWord(videoWordDTO));

		return videoWordConverter.toVideoWordDTO(videoWord);
	}

	private void validate(VideoWordDTO videoWordDTO) {

		if (videoWordDTO == null || videoWordDTO.getId() < 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Integer id = videoWordDTO.getId();

		if (id != 0 && !videoWordRepository.existsById(id))
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.VIDEO_WORD);

		EntityValidator.checkValidate(error -> {

			if (!videoRepository.existsById(videoWordDTO.getVideoId()))
				error.put("videoId", "Video không tồn tại");

		});

	}

	@Override
	public void delete(Integer id) {

		if (id == null || id <= 0)
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.VIDEO_WORD);

		videoWordRepository.deleteById(id);
	}

	@Override
	public String uploadSound(Integer id, MultipartFile sound) {
		if (id == null || id <= 0 || sound == null)
			throw MyExceptionHelper.throwIllegalArgumentException();

		VideoWord videoWord = videoWordRepository.findById(id)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.VIDEO_WORD));

		String soundString = videoWord.getSound();
		if (soundString != null) {

			String publicId = FileUtils.getPuclidId(soundString);
			cloudinaryService.deleteFile(publicId, MyConstant.VIDEO);
		}

		String soundUpload = cloudinaryService.uploadFile(sound, MyConstant.VIDEO);
		videoWord.setSound(soundUpload);

		videoWordRepository.save(videoWord);

		return soundUpload;
	}
}
