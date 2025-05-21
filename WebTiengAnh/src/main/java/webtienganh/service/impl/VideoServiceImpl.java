package webtienganh.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import webtienganh.converter.VideoConverter;
import webtienganh.dto.PaginationWrapper;
import webtienganh.dto.VideoDTO;
import webtienganh.dto.VideoSummaryDTO;
import webtienganh.entity.Video;
import webtienganh.exception.MyExceptionHelper;
import webtienganh.repository.VideoCategoryRepository;
import webtienganh.repository.VideoRepository;
import webtienganh.service.CloudinaryService;
import webtienganh.service.VideoService;
import webtienganh.utils.EntityValidator;
import webtienganh.utils.FileUtils;
import webtienganh.utils.MyConstant;

@Service
@Transactional
public class VideoServiceImpl implements VideoService {

	@Autowired
	private VideoRepository videoRepository;

	@Autowired
	private VideoConverter videoConverter;

	@Autowired
	private CloudinaryService cloudinaryService;

	@Autowired
	private VideoCategoryRepository videoCategoryRepository;

	@Override
	public PaginationWrapper<List<VideoSummaryDTO>> getListSummaries(String categorySlug, long timeFrom, long timeTo,
			int level, int page, int size) {

		if (categorySlug == null || timeFrom < 0 || timeTo < 0 || level < 0 || level > 7
				|| (timeTo > 0 && timeFrom > timeTo) || page < 0 || size <= 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		PaginationWrapper<List<VideoSummaryDTO>> result = new PaginationWrapper<>();

		result.setPage(page);
		result.setSize(size);

		long timeToTempt = timeTo;

		if (timeTo == 0)
			timeToTempt = Long.MAX_VALUE;

		Page<Video> videosPage;

		if (level == 0) {

			videosPage = videoRepository.findAllByCategorySlugAndDurationBetween(categorySlug, timeFrom, timeToTempt,
					PageRequest.of(page, size));
		} else {

			videosPage = videoRepository.findAllByCategorySlugAndDurationBetweenAndLevel(categorySlug, timeFrom,
					timeToTempt, level, PageRequest.of(page, size));
		}

		List<VideoSummaryDTO> videoSummaryDTOs = videosPage.toList().stream()
				.map(video -> videoConverter.toVideoSummaryDTO(video)).collect(Collectors.toList());
		result.setData(videoSummaryDTOs);

		result.setTotalPages(videosPage.getTotalPages());

		return result;
	}

	@Override
	public VideoDTO getOne(String slug) {

		if (slug == null)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Video video = videoRepository.findBySlug(slug)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.VIDEO));

		return videoConverter.toVideoDTO(video);
	}

	@Override
	public VideoDTO save(VideoDTO videoDTO) {

		validate(videoDTO);

		Video video = videoRepository.save(videoConverter.toVideo(videoDTO));

		return videoConverter.toVideoDTO(video);
	}

	private void validate(VideoDTO videoDTO) {

		if (videoDTO == null || videoDTO.getId() < 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Integer id = videoDTO.getId();

		if (id != 0 && !videoRepository.existsById(id))
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.VIDEO);

		EntityValidator.checkValidate(error -> {

			if (videoRepository.existsByIdNotAndName(id, videoDTO.getName()))
				error.put("name", "Tên Video đã trùng");

			if (!videoCategoryRepository.existsById(videoDTO.getCategoryId()))
				error.put("categoryId", "Video Category không tồn tại");
		});

	}

	@Override
	public String uploadImage(Integer id, MultipartFile image) {
		if (id == null || id <= 0 || image == null)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Video video = videoRepository.findById(id)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.VIDEO));

		String imageString = video.getImage();
		if (imageString != null) {

			String publicId = FileUtils.getPuclidId(imageString);
			cloudinaryService.deleteFile(publicId, "");
		}

		String imageUpload = cloudinaryService.uploadFile(image, "");
		video.setImage(imageUpload);

		videoRepository.save(video);

		return imageUpload;
	}

	@Override
	public String uploadVideo(Integer id, MultipartFile videoFile) {
		if (id == null || id <= 0 || videoFile == null)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Video video = videoRepository.findById(id)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.VIDEO));

		String videoString = video.getUrl();
		if (videoString != null) {

			String publicId = FileUtils.getPuclidId(videoString);
			cloudinaryService.deleteFile(publicId, MyConstant.VIDEO);
		}

		String videoUpload = cloudinaryService.uploadFile(videoFile, MyConstant.VIDEO);
		video.setUrl(videoUpload);

		videoRepository.save(video);

		return videoUpload;
	}

	@Override
	public void delete(Integer id) {
		if (id == null || id <= 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Video video = videoRepository.findById(id)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.VIDEO));

		videoRepository.deleteById(id);

		String image = video.getImage();
		if (image != null) {
			String publicId = FileUtils.getPuclidId(image);
			cloudinaryService.deleteFile(publicId, "");
		}

		String videoUrl = video.getUrl();
		if (videoUrl != null) {

			String publicId = FileUtils.getPuclidId(videoUrl);
			cloudinaryService.deleteFile(publicId, MyConstant.VIDEO);
		}

	}
}
